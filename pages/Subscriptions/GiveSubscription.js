import {Fragment, useEffect, useState, useMemo} from 'react';
import {useRouter} from 'next/router';
import {Container, Select, useDisclosure, Stack, Text} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {HomeLayout} from '../../layouts';
import {selectSubscription} from '../../state/selectors/subscriptions';
import {selectIsPermissions} from '../../state/selectors/users';
import {selectStatus} from '../../state/selectors/admin';
import {fetchById} from '../../state/actions/subscriptions';
import {give} from '../../state/actions/admin';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Loading from '../../components/Loading';
import ModalSearchUser from '../../components/Modals/ModalSearchUser';
import Button from '../../components/Button';
import {defaultLanguageCode} from '../../utils/constants';
import useDateFormat from '../../hooks/useDateFormat';

const GiveSubscription = withAuthenticationRequired(
  ({status, permissions, subscription, onFetchById, onGive}) => {
    const {d, addDaysToDate} = useDateFormat();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter();
    const {id} = router.query;
    const [userSelected, setUserSelected] = useState();
    const [planSelected, setPlanSelected] = useState();
    const plans = useMemo(() => {
      const _plan = [];
      subscription?.plans?.forEach((p) => {
        const translations = p.translations.find(
          (t) => t.language === defaultLanguageCode,
        );
        _plan.push({
          ...p,
          name: translations.name,
          description: translations.description,
        });
      });
      return _plan;
    }, [subscription?.plans]);
    useEffect(() => {
      if (id) {
        onFetchById(id);
      }
    }, [id, onFetchById]);
    const handleOnSelectUser = (user) => {
      setUserSelected(user);
      onClose();
    };
    const handleOnGiveSubscription = () => {
      const p = plans.find((x) => x.id === planSelected);
      const body = {
        subscriptionId: subscription.id,
        name: subscription.translations.find(
          (t) => t.language === defaultLanguageCode,
        ).name,
        subheading: subscription.translations.find(
          (t) => t.language === defaultLanguageCode,
        ).subheading,
        purchaseDate: d(new Date(), 'yyyy-MM-dd'),
        endDate: p.monthly
          ? d(addDaysToDate(new Date(), 30), 'yyyy-MM-dd')
          : subscription.endDate,
        monthly: p.monthly,
        warranty: false,
        sportName: subscription.sportName,
        pictureUrl: subscription.pictureUrl,
        active: true,
        planId: p.id,
      };
      onGive(userSelected.id, body);
      setUserSelected();
      setPlanSelected('');
    };
    return (
   
        <Container maxW="full">
          {status.isFetching && <Loading />}
          <ModalSearchUser
            role="user"
            isOpen={isOpen}
            onClose={onClose}
            onSelectUser={handleOnSelectUser}
          />
          <Stack>
            <Select
              value={planSelected}
              onChange={(e) => setPlanSelected(e.target.value)}
              placeholder="Seleccionar plan">
              {plans.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
            <Button
              variant="outline"
              color="black.100"
              background={undefined}
              onClick={onOpen}>
              Seleccionar usuario
            </Button>
            {userSelected && (
              <Fragment>
                <Stack direction="row">
                  <Text fontWeight="bold">Usuario Seleccionado: </Text>
                  <Text>{`${userSelected.firstName} ${userSelected.lastName}`}</Text>
                </Stack>
                <Stack direction="row">
                  <Text fontWeight="bold">Username: </Text>
                  <Text>{userSelected.username}</Text>
                </Stack>
              </Fragment>
            )}
            <Button
              onClick={handleOnGiveSubscription}
              disabled={!userSelected && !planSelected}>
              Regalar
            </Button>
          </Stack>
        </Container>
      
    );
  },
);

GiveSubscription.Layout = HomeLayout;
export default connect(
  (state) => ({
    status: selectStatus(state),
    permissions: selectIsPermissions(state),
    subscription: selectSubscription(state),
  }),
  {
    onFetchById: fetchById,
    onGive: give,
  },
)(GiveSubscription);
