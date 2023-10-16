import {useMemo, useEffect, useState} from 'react';
import {
  Container,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {HomeLayout} from '../../layouts';
import DiscountForm from '../../components/Discount/DiscountForm';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import ModalConfirmation from '../../components/Modals/ModalConfirmation';
import {selectLanguageLanguages} from '../../state/selectors/language';
import {selectIsPermissions} from '../../state/selectors/users';
import {
  selectDiscountStatus,
  selectDiscounts,
  selectPage,
  selectSize,
} from '../../state/selectors/discount';
import {
  createUserDiscount,
  createSubscriptionDiscount,
  createAllDiscount,
  fetch,
  setDefaultState,
  changePage,
  changeSize,
} from '../../state/actions/discount';
import useWindowsDimension from '../../hooks/useWindowsDimension';
import useDateFormat from '../../hooks/useDateFormat';
import {defaultLanguageCode, getFormDate} from '../../utils/constants';

const Discount = withAuthenticationRequired(
  ({
    status,
    discounts,
    permissions,
    languages,
    page,
    size,
    onFetch,
    onCreateUserDiscount,
    onCreateSubscriptionDiscount,
    onCreateAllDiscount,
    onSetDefaultState,
    onChangePage,
    onChangeSize,
  }) => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const currentDate = useMemo(() => new Date(), []);
    const isMobile = useBreakpointValue({base: true, xl: false});
    const {height} = useWindowsDimension();
    const [error, setError] = useState();
    const {d, compareDateisAfter} = useDateFormat();
    useEffect(() => {
      if (
        status.isError &&
        compareDateisAfter(status.lastReceivedTime, currentDate)
      ) {
        setError(status.errorMessage);
        onOpen();
      }
    }, [status, compareDateisAfter, currentDate, onOpen]);
    useEffect(() => {
      onFetch({pageSize: size, pageNumber: page});
    }, [onFetch, size, page]);
    const getTranslations = (values) => {
      const _translations = [];
      languages?.forEach((l) => {
        _translations.push({
          name: values[`language_name_discount_${l.id}`],
          description: values[`language_discount_${l.id}`],
          language: languages.find((la) => la.id === l.id).code,
        });
      });
      return _translations;
    };
    const getWarrantyUser = (option) => {
      switch (option) {
        case 'no_warranty':
          return false;
        case 'warranty':
          return true;
        default:
          return undefined;
      }
    };

    const getBody = (values, validSubscriptions, validForWarranty, picture) => {
      return {
        percentage: values.percentage,
        dueDate: getFormDate(values.effectiveDate).toISOString(),
        translations: getTranslations(values),
        validSubscriptions:
          validSubscriptions.length > 0 ? validSubscriptions : undefined,
        validForWarranty: getWarrantyUser(validForWarranty),
        picture,
      };
    };

    const getBodyUser = (
      values,
      users,
      validSubscriptions,
      validForWarranty,
      picture,
    ) => {
      return {
        percentage: values.percentage,
        dueDate: getFormDate(values.effectiveDate).toISOString(),
        translations: getTranslations(values),
        userIds: users.map((u) => u.id),
        validSubscriptions:
          validSubscriptions.length > 0 ? validSubscriptions : undefined,
        validForWarranty: getWarrantyUser(validForWarranty),
        picture,
      };
    };

    const getBodySubscription = (
      values,
      subscriptionId,
      warrantyUsers,
      validSubscriptions,
      validForWarranty,
      picture,
    ) => {
      return {
        percentage: values.percentage,
        subscriptionId,
        warrantyUsers: getWarrantyUser(warrantyUsers),
        dueDate: getFormDate(values.effectiveDate).toISOString(),
        translations: getTranslations(values),
        validSubscriptions:
          validSubscriptions.length > 0 ? validSubscriptions : undefined,
        validForWarranty: getWarrantyUser(validForWarranty),
        picture,
      };
    };

    const handleOnSubmit = (
      values,
      subscriptionOption,
      users,
      validForSubscription,
      warrantySelected,
      warrantySubscriptionSelected,
      picture,
    ) => {
      switch (subscriptionOption) {
        case 'user':
          users.length > 0
            ? onCreateUserDiscount(
                getBodyUser(
                  values,
                  users,
                  validForSubscription,
                  warrantySubscriptionSelected,
                  picture,
                ),
              )
            : onCreateAllDiscount(
                getBody(
                  values,
                  validForSubscription,
                  warrantySubscriptionSelected,
                  picture,
                ),
              );
          break;
        case 'all':
          onCreateAllDiscount(
            getBody(
              values,
              validForSubscription,
              warrantySubscriptionSelected,
              picture,
            ),
          );
          break;
        default:
          onCreateSubscriptionDiscount(
            getBodySubscription(
              values,
              subscriptionOption,
              warrantySelected,
              validForSubscription,
              warrantySubscriptionSelected,
              picture,
            ),
          );
          break;
      }
    };
    return (
      // permissions && (
        <Container maxW="full">
          <ModalConfirmation
            title="Error"
            info={error}
            buttons={[
              <Button
                onClick={() => {
                  onClose();
                  onSetDefaultState();
                }}>
                Aceptar
              </Button>,
            ]}
            isOpen={isOpen}
            onClose={() => {
              onClose();
              onSetDefaultState();
            }}
          />
          {status.isFetching && <Loading />}
          <Stack flex={1} direction={['column', 'row']}>
            <Stack flex={1}>
              <DiscountForm onSubmit={handleOnSubmit} />
            </Stack>
            <Stack bg="white" borderRadius="12px" p={6} flex={0.3}>
              <Text fontSize="15px" fontWeight="bold" color="black">
                Descuentos enviados
              </Text>
              <Stack h={!isMobile && height - 200} overflow="scroll">
                {discounts?.data?.map((dis) => {
                  const defautlLanguage = dis.translations.find(
                    (t) => t.language === defaultLanguageCode,
                  );
                  return (
                    <Stack key={dis.id} py={2}>
                      <Text fontSize="14px">{`Discount: ${dis.percentage}%`}</Text>
                      <Text fontSize="14px">{`Fecha: ${d(
                        new Date(dis.dueDate),
                        'yyyy/MM/dd',
                      )}`}</Text>
                      <Text fontSize="14px">{`Nombre: ${
                        defautlLanguage
                          ? defautlLanguage.name
                          : dis.translations[0].name
                      }`}</Text>
                      <Text fontSize="14px">{`Descripción: ${
                        defautlLanguage
                          ? defautlLanguage.description
                          : dis.translations[0].description
                      }`}</Text>
                      <Text fontSize="14px">{`Id: ${dis.id.replaceAll(
                        '-',
                        '',
                      )}`}</Text>
                    </Stack>
                  );
                })}
              </Stack>
              <Pagination
                {...discounts}
                onChangePage={(pageP) => onChangePage(pageP)}
                onSetPageSize={(pageS) => onChangeSize(pageS)}
              />
            </Stack>
          </Stack>
        </Container>
      // )
    );
  },
);

Discount.Layout = HomeLayout;

export default connect(
  (state) => ({
    status: selectDiscountStatus(state),
    discounts: selectDiscounts(state),
    permissions: selectIsPermissions(state),
    languages: selectLanguageLanguages(state),
    page: selectPage(state),
    size: selectSize(state),
  }),
  {
    onFetch: fetch,
    onCreateUserDiscount: createUserDiscount,
    onCreateSubscriptionDiscount: createSubscriptionDiscount,
    onCreateAllDiscount: createAllDiscount,
    onSetDefaultState: setDefaultState,
    onChangePage: changePage,
    onChangeSize: changeSize,
  },
)(Discount);
