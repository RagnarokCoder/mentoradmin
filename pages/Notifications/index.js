import {Fragment, useEffect, useMemo, useState} from 'react';
import {
  useBreakpointValue,
  Container,
  Stack,
  Flex,
  Text,
  Textarea,
  Select,
  Box,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';
import {HomeLayout} from '../../layouts';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import ModalSearchUser from '../../components/Modals/ModalSearchUser';
import Pagination from '../../components/Pagination';
import {fetch} from '../../state/actions/subscriptions';
import {fetchLanguages} from '../../state/actions/language';
import {
  fetchNotifications,
  createNotifications,
  createUserNotifications,
  changePage,
  changeSize,
} from '../../state/actions/notifications';
import {fetchCountries} from '../../state/actions/country';
import {fetchUsers} from '../../state/actions/users';
import {
  selectSubscriptions,
  selectSubscriptionStatus,
} from '../../state/selectors/subscriptions';
import {
  selectLanguageLanguages,
  selectLanguageStatus,
} from '../../state/selectors/language';
import {selectCountryCountries} from '../../state/selectors/country';
import {
  selectNotifications,
  selectNotificationsStatus,
  selectPage,
  selectSize,
} from '../../state/selectors/notifications';
import {selectIsPermissions, selectUsers} from '../../state/selectors/users';
import {Form, Formik} from 'formik';
import newNotificationSchema from '../../forms/schemas/newNotificationSchema';
import newNotificationUserSchema from '../../forms/schemas/newNotificationUserSchema';
import useWindowsDimension from '../../hooks/useWindowsDimension';

const Notifications = withAuthenticationRequired(
  ({
    permissions,
    subscriptions,
    countries,
    users,
    languages,
    page,
    size,
    notifications,
    statusSubscription,
    statusLanguage,
    statusNotification,
    onFetchSubscriptions,
    onFetchLanguages,
    onFetchCountries,
    onFetchNotifications,
    onCreateNotifications,
    onCreateUserNotifications,
    onFetchUsers,
    onChangePage,
    onChangeSize,
  }) => {
    const router = useRouter();
    const {userId, postId} = router.query;
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [modeUser, setModeUser] = useState(false);
    const [restarting, setRestarting] = useState(false);
    const [userSelected, setUserSelected] = useState();
    const [initialValues, setInitialValues] = useState();
    const [error, setError] = useState(false);
    const {height} = useWindowsDimension();
    const isMobile = useBreakpointValue({base: true, xl: false});
    useEffect(() => {
      onFetchSubscriptions({
        PreSaleDateEnd: new Date().toISOString().split('T')[0],
        EndDateBegin: new Date().toISOString().split('T')[0],
      });
      onFetchLanguages();
      onFetchCountries();
    }, [onFetchLanguages, onFetchCountries, onFetchSubscriptions]);
    useEffect(() => {
      onFetchNotifications({pageSize: size, pageNumber: page});
    }, [onFetchNotifications, page, size]);
    useEffect(() => {
      if (userId && postId) {
        onFetchUsers({id: userId});
      }
    }, [postId, userId, onFetchUsers]);
    useEffect(() => {
      if (users?.data.length > 0 && userId && postId) {
        setUserSelected(users?.data[0]);
        setModeUser('user');
        setInitialValues({subscription: 'user'});
        resetForm();
      }
    }, [postId, userId, users]);
    const isLoading = useMemo(
      () =>
        statusSubscription.isFetching ||
        statusLanguage.isFetching ||
        statusNotification.isFetching,
      [statusLanguage, statusSubscription, statusNotification],
    );
    const Subscriptions = useMemo(() => {
      const all = {id: 'all', name: 'Todas las suscripciones'};
      const user = {id: 'user', name: 'A un usuario'};
      const _subscriptions = subscriptions?.data.map((s) => {
        return {id: s.id, name: s.name};
      });
      return [...[all, user], ..._subscriptions];
    }, [subscriptions]);

    const getBodyNotification = (values) => {
      const lan = languages.find((l) => l.id === values.language);
      let to = '';
      let topic = '';
      if (values.subscription !== 'all') {
        const sub = subscriptions.data.find(
          (s) => s.id === values.subscription,
        );
        to = sub.sportName;
        topic = `${sub.id}-${lan.code}`;
      } else {
        to = 'all';
        topic = `${to}-${lan.code}`;
      }
      return {
        to,
        topic,
        title: values.title,
        body: values.message,
        language: lan.code,
      };
    };

    const getBodyUserNotification = (values) => {
      const lan = languages.find((l) => l.id === userSelected.languageId);
      return {
        to: userSelected?.username,
        tokens: userSelected.deviceTokens,
        title: values.title,
        body: values.message,
        language: lan.code,
        postId,
      };
    };

    const handleOnSubmit = (values) => {
      if (modeUser) {
        if (userSelected) {
          setError(false);
          onCreateUserNotifications(getBodyUserNotification(values));
        } else {
          setError(true);
        }
      } else {
        onCreateNotifications(getBodyNotification(values));
      }
      resetForm();
      setUserSelected();
      setModeUser();
    };

    const handleOnChangeSubscription = (value) => {
      setModeUser(value === 'user');
      if (value !== 'user') {
        setUserSelected();
      }
    };
    const handleOnSelectUser = (user) => {
      setUserSelected(user);
      setError(false);
      onClose();
    };
    const resetForm = () => {
      setRestarting(true);
      setTimeout(() => {
        setRestarting(false);
      }, 1);
    };
    return (
      permissions && (
        <Container maxW="full">
          {isLoading && <Loading />}
          <ModalSearchUser
            isOpen={isOpen}
            role="user"
            onClose={onClose}
            onSelectUser={handleOnSelectUser}
          />
          <Stack flex={1} direction={['column', 'row']}>
            <Stack
              bg="white"
              borderRadius="12px"
              p={6}
              display="flex"
              flex={0.7}>
              {!restarting && (
                <Formik
                  initialValues={{...initialValues}}
                  validationSchema={
                    modeUser ? newNotificationUserSchema : newNotificationSchema
                  }
                  onSubmit={handleOnSubmit}>
                  {({handleChange, handleBlur, errors, values}) => (
                    <Form>
                      <Text fontSize="15px" fontWeight="bold" color="black">
                        Detalles de la notificación
                      </Text>
                      <Text pt={4} fontSize="13px">
                        A quien va dirigida la notificacion?
                      </Text>
                      <Stack
                        display="flex"
                        flex={1}
                        mb={4}
                        mt={2}
                        direction={['column', 'row']}>
                        <Select
                          isRequired
                          defaultValue={values.subscription}
                          isInvalid={errors.subscription}
                          errorBorderColor="red"
                          disabled={userId}
                          placeholder="Seleccionar Subscription"
                          onChange={(e) => {
                            handleChange('subscription')(e);
                            handleOnChangeSubscription(e.target.value);
                          }}
                          onBlur={handleBlur('subscription')}>
                          {Subscriptions.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </Select>
                        {modeUser ? (
                          <Button
                            w={400}
                            variant="outline"
                            color="black.100"
                            borderColor={error ? 'red' : 'green.100'}
                            background={undefined}
                            disabled={userId}
                            onClick={onOpen}>
                            Selecciona usuario
                          </Button>
                        ) : (
                          <Select
                            isRequired
                            defaultValue={values.language}
                            isInvalid={errors.language}
                            errorBorderColor="red"
                            placeholder="Seleccionar Lenguage"
                            onChange={handleChange('language')}
                            onBlur={handleBlur('language')}>
                            {languages?.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                          </Select>
                        )}
                      </Stack>
                      {userSelected && (
                        <Stack direction="row" align="center" my={6}>
                          {userSelected.pictureUrl && (
                            <Image
                              boxSize="60px"
                              borderRadius="full"
                              objectFit="cover"
                              alt="User picture"
                              src={userSelected.pictureUrl}
                            />
                          )}
                          <Stack spacing={1}>
                            <Stack direction="row">
                              <Text fontWeight="bold">Nombre: </Text>
                              <Text>{`${userSelected.firstName} ${userSelected.lastName}`}</Text>
                            </Stack>
                            {userSelected.username && (
                              <Stack direction="row">
                                <Text fontWeight="bold">Username: </Text>
                                <Text>{userSelected.username}</Text>
                              </Stack>
                            )}
                            <Stack direction="row">
                              <Text fontWeight="bold">Idioma: </Text>
                              <Text>
                                {
                                  languages.find(
                                    (l) => l.id === userSelected.languageId,
                                  )?.name
                                }
                              </Text>
                            </Stack>
                            <Stack direction="row">
                              <Text fontWeight="bold">País: </Text>
                              <Text>
                                {
                                  countries.find(
                                    (l) => l.id === userSelected.countryId,
                                  )?.name
                                }
                              </Text>
                            </Stack>
                          </Stack>
                        </Stack>
                      )}
                      <Input
                        type="text"
                        value={values.title}
                        variant="outline"
                        isRequired
                        isInvalid={errors.title}
                        errorBorderColor="red"
                        captionLabel="Titulo"
                        placeholder="Titulo"
                        onChange={handleChange('title')}
                        onBlur={handleBlur('title')}
                      />
                      <Textarea
                        type="text"
                        my={4}
                        value={values.message}
                        variant="outline"
                        isRequired
                        isInvalid={errors.message}
                        errorBorderColor="red"
                        placeholder="Mensage"
                        onChange={handleChange('message')}
                        onBlur={handleBlur('message')}
                      />
                      <Flex justify="end">
                        <Button type="submit" w={60}>
                          Enviar
                        </Button>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              )}
            </Stack>
            <Stack bg="white" borderRadius="12px" p={6} flex={0.3}>
              <Text fontSize="15px" fontWeight="bold" color="black">
                Notificaciones enviadas
              </Text>
              <Stack h={!isMobile && height - 200} overflow="scroll">
                {notifications?.data?.map((n) => (
                  <Fragment key={n.id}>
                    <Text fontSize="15px" fontWeight="bold">
                      {n.title}
                    </Text>
                    <Text fontSize="14px">{n.body}</Text>
                    <Text fontSize="12px" color="gray.900">
                      {`Enviado a: ${n.to}`}
                    </Text>
                    <Text fontSize="12px" color="gray.900">
                      {languages?.find((l) => l.code === n.language)?.name}
                    </Text>
                    <Box h="1px" bg="gray.500" />
                  </Fragment>
                ))}
              </Stack>
              <Pagination
                {...notifications}
                onChangePage={(pageP) => onChangePage(pageP)}
                onSetPageSize={(pageS) => onChangeSize(pageS)}
              />
            </Stack>
          </Stack>
        </Container>
      )
    );
  },
);

Notifications.Layout = HomeLayout;

export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
    subscriptions: selectSubscriptions(state),
    languages: selectLanguageLanguages(state),
    notifications: selectNotifications(state),
    statusSubscription: selectSubscriptionStatus(state),
    statusLanguage: selectLanguageStatus(state),
    statusNotification: selectNotificationsStatus(state),
    countries: selectCountryCountries(state),
    users: selectUsers(state),
    page: selectPage(state),
    size: selectSize(state),
  }),
  {
    onFetchSubscriptions: fetch,
    onFetchLanguages: fetchLanguages,
    onFetchCountries: fetchCountries,
    onFetchNotifications: fetchNotifications,
    onCreateNotifications: createNotifications,
    onCreateUserNotifications: createUserNotifications,
    onFetchUsers: fetchUsers,
    onChangePage: changePage,
    onChangeSize: changeSize,
  },
)(Notifications);
