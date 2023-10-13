import {Fragment, useEffect, useState, useMemo, useCallback} from 'react';
import {
  Stack,
  Flex,
  Text,
  Select,
  SimpleGrid,
  RadioGroup,
  Radio,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {Form, Formik} from 'formik';
import newDiscountSchema from '../../forms/schemas/newDiscountSchema';
import Button from '../Button';
import Input from '../Input';
import Loading from '../Loading';
import ModalConfirmation from '../Modals/ModalConfirmation';
import ModalSearchUser from '../Modals/ModalSearchUser';
import buildFormSchema from '../../forms/validations/buildFormSchema';
import {
  selectSubscriptions,
  selectSubscriptionStatus,
} from '../../state/selectors/subscriptions';
import {selectLanguageLanguages} from '../../state/selectors/language';
import {selectCountryCountries} from '../../state/selectors/country';
import {fetch} from '../../state/actions/subscriptions';
import {fetchLanguages} from '../../state/actions/language';
import {fetchCountries} from '../../state/actions/country';
import UserRow from './UserRow';
import ValidSubscription from './ValidSubscription';
import {formatBytes, validateMaxSize} from '../../utils/constants';

const DiscountForm = ({
  subscriptions,
  languages,
  countries,
  status,
  onFetchSubscriptions,
  onFetchLanguages,
  onFetchCountries,
  onSubmit,
}) => {
  const modalsearchUser = useDisclosure();
  const modalconfirmation = useDisclosure();
  const [schema, setSchema] = useState();
  const [warrantySelected, setWarrantySelected] = useState('no_warranty');
  const [formPicture, setFormPicture] = useState();
  const [currentPicture, setCurrentPicture] = useState();
  const [warrantySubscriptionSelected, setWarrantySubscriptionSelected] =
    useState('no_warranty');
  const [subscriptionOption, setSubscriptionOption] = useState('');
  const [userSelected, setUserSelected] = useState([]);
  const [subscriptionValid, setSubscriptionValid] = useState('');
  const [validForSubscription, setValidForSubscription] = useState([]);
  const [restarting, setRestarting] = useState(false);

  useEffect(() => {
    onFetchSubscriptions({
      PreSaleDateEnd: new Date().toISOString().split('T')[0],
      EndDateBegin: new Date().toISOString().split('T')[0],
    });
    onFetchLanguages();
    onFetchCountries();
  }, [onFetchSubscriptions, onFetchLanguages, onFetchCountries]);

  useEffect(() => {
    const _languages = [];
    languages?.forEach((l) => {
      _languages.push(
        {
          name: `language_name_discount_${l.id}`,
          type: 'text',
          validations: [
            {
              type: 'required',
              message: 'Name is required.',
            },
          ],
        },
        {
          name: `language_discount_${l.id}`,
          type: 'text',
          validations: [
            {
              type: 'required',
              message: 'Discount is required.',
            },
          ],
        },
      );
    });
    setSchema(buildFormSchema({fields: [...newDiscountSchema, ..._languages]}));
  }, [languages]);

  const Subscriptions = useMemo(() => {
    const user = {id: 'user', name: 'A un usuario'};
    const todos = {id: 'all', name: 'Todos'};
    const _subscriptions = subscriptions?.data.map((s) => {
      return {id: s.id, name: s.name};
    });
    return [...[user, todos], ..._subscriptions];
  }, [subscriptions]);

  const handleOnChangeSubscription = useCallback((value) => {
    setSubscriptionOption(value);
    setUserSelected([]);
  }, []);

  const handleOnSelectUser = (user) => {
    const userAlreadyAdded = userSelected.find((u) => u.id === user.id);
    if (!userAlreadyAdded) {
      userSelected.push(user);
      setUserSelected([...userSelected]);
    }
    modalsearchUser.onClose();
  };

  const handleOnRemove = (user) =>
    setUserSelected([...userSelected.filter((i) => i.id !== user.id)]);

  const handleOnSubmitValues = (values) => {
    onSubmit(
      values,
      subscriptionOption,
      userSelected,
      validForSubscription,
      warrantySelected,
      warrantySubscriptionSelected,
      formPicture,
    );
    setWarrantySelected('no_warranty');
    setWarrantySubscriptionSelected('no_warranty');
    setSubscriptionOption('');
    setValidForSubscription([]);
    setSubscriptionValid('');
    setUserSelected([]);
    setFormPicture();
    setCurrentPicture();
    resetForm();
  };

  const handleOnChangeAddValidForSubscription = () => {
    validForSubscription.push(subscriptionValid);
    setValidForSubscription([...validForSubscription]);
  };

  const resetForm = () => {
    setRestarting(true);
    setTimeout(() => {
      setRestarting(false);
    }, 1);
  };

  const handleOnRemoveForSubscription = (subscription) =>
    setValidForSubscription([
      ...validForSubscription.filter((i) => i !== subscription.id),
    ]);

  const handleOnChangeFile = useCallback(
    (e) => {
      if (e.target.files.length) {
        const upload_file = e.target.files[0];
        const bytes = formatBytes(upload_file.size);
        const isValid = validateMaxSize(
          bytes.split(' ')[0],
          bytes.split(' ')[1],
        );
        if (isValid) {
          setCurrentPicture(URL.createObjectURL(upload_file));
          setFormPicture(upload_file);
        } else {
          modalconfirmation.onOpen();
        }
      }
    },
    [modalconfirmation],
  );

  return (
    <Fragment>
      {status.isFetching && <Loading />}
      <ModalSearchUser
        role="user"
        isOpen={modalsearchUser.isOpen}
        onClose={modalsearchUser.onClose}
        onSelectUser={handleOnSelectUser}
      />
      <ModalConfirmation
        title="Imagen demasiado grande"
        info="La imagen es demasiado grande, por favor seleccione otra, tamaño maximo 5 MB"
        buttons={[<Button onClick={modalconfirmation.onClose}>Aceptar</Button>]}
        isOpen={modalconfirmation.isOpen}
        onClose={modalconfirmation.onClose}
      />
      {!restarting && (
        <Formik
          initialValues={{}}
          validationSchema={schema}
          onSubmit={handleOnSubmitValues}>
          {({handleChange, handleBlur, errors, values}) => (
            <Form>
              <Stack
                bg="white"
                borderRadius="12px"
                p={6}
                boxShadow="lg"
                display="flex"
                flex={1}>
                <Text fontWeight="bold" fontSize="15px">
                  Detalle del cupon de descuento
                </Text>
                <SimpleGrid columns={[1, 2]} spacing={4} alignItems="end">
                  <Input
                    type="number"
                    value={values.percentage}
                    variant="outline"
                    maxLength={3}
                    isInvalid={errors.percentage}
                    errorBorderColor="red"
                    placeholder="Porcentaje"
                    captionLabel="Porcentaje"
                    onChange={handleChange('percentage')}
                    onBlur={handleBlur('percentage')}
                  />
                  <Input
                    type="date"
                    value={values.effectiveDate}
                    variant="outline"
                    isRequired
                    isInvalid={errors.effectiveDate}
                    errorBorderColor="red"
                    captionLabel="Fecha de vigencia"
                    placeholder="Fecha de vigencia"
                    onChange={handleChange('effectiveDate')}
                    onBlur={handleBlur('effectiveDate')}
                  />
                  <Stack>
                    <Text fontSize="13px">A quien va dirigido?</Text>
                    <Select
                      isRequired
                      defaultValue={values.subscription}
                      isInvalid={errors.subscription}
                      errorBorderColor="red"
                      placeholder="A quien va dirigido?"
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
                  </Stack>
                  {subscriptionOption === 'user' && (
                    <Button
                      variant="outline"
                      color="black.100"
                      borderColor="green.100"
                      background={undefined}
                      onClick={modalsearchUser.onOpen}>
                      Selecciona usuario
                    </Button>
                  )}
                  {subscriptionOption !== 'user' &&
                    subscriptionOption !== 'all' &&
                    subscriptionOption !== '' && (
                      <RadioGroup
                        colorScheme="green"
                        defaultValue="no_warranty"
                        onChange={setWarrantySelected}>
                        <Stack direction="row">
                          <Radio value="no_warranty">Sin garantía</Radio>
                          <Radio value="warranty">Con garantía</Radio>
                          <Radio value="all">Todos</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                </SimpleGrid>
                {userSelected.length > 0 &&
                  userSelected.map((i) => (
                    <UserRow
                      key={i.id}
                      user={i}
                      languageName={
                        languages.find((l) => l.id === i.languageId)?.name
                      }
                      countryName={
                        countries.find((l) => l.id === i.countryId)?.name
                      }
                      onRemove={handleOnRemove}
                    />
                  ))}
                <SimpleGrid columns={[1, 2]} spacing={4} alignItems="end">
                  <Stack>
                    <Text fontSize="13px">Valido para las suscripciones</Text>
                    <Select
                      placeholder="Valido para las suscripciones"
                      value={subscriptionValid}
                      onChange={(e) => setSubscriptionValid(e.target.value)}>
                      {subscriptions?.data.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                  <Button
                    variant="outline"
                    color="black.100"
                    borderColor="green.100"
                    disabled={
                      subscriptionValid === '' ||
                      validForSubscription.find((x) => x === subscriptionValid)
                    }
                    background={undefined}
                    onClick={handleOnChangeAddValidForSubscription}>
                    Agregar
                  </Button>
                  <RadioGroup
                    colorScheme="green"
                    defaultValue="no_warranty"
                    onChange={setWarrantySubscriptionSelected}>
                    <Stack direction="row">
                      <Radio value="no_warranty">Sin garantía</Radio>
                      <Radio value="warranty">Con y sin garantía</Radio>
                    </Stack>
                  </RadioGroup>
                </SimpleGrid>
                {validForSubscription.map((x) => (
                  <ValidSubscription
                    key={x}
                    subscription={subscriptions?.data.find((y) => y.id === x)}
                    onRemove={handleOnRemoveForSubscription}
                  />
                ))}
                <Input
                  pt={4}
                  type="file"
                  placeholder="Logo"
                  variant="unstyled"
                  accept="image/*"
                  isRequired={true}
                  onChange={handleOnChangeFile}
                />
                {currentPicture && (
                  <Image
                    boxSize="200px"
                    objectFit="contain"
                    src={currentPicture}
                    alt="Logo"
                  />
                )}
                <Fragment>
                  <Text fontWeight="bold" pt={10} fontSize="15px">
                    Detalle de idioma
                  </Text>
                  {languages?.map((i) => (
                    <Stack key={i.id} py={2}>
                      <Text fontSize="12px" color="black" fontWeight="bold">
                        {i.name}
                      </Text>
                      <Stack direction={['column', 'row']} spacing={4}>
                        <Input
                          type="text"
                          value={values[`language_name_discount_${i.id}`]}
                          variant="outline"
                          isRequired
                          isInvalid={errors[`language_name_discount_${i.id}`]}
                          errorBorderColor="red"
                          placeholder="Nombre"
                          captionLabel="Nombre"
                          onChange={handleChange(
                            `language_name_discount_${i.id}`,
                          )}
                          onBlur={handleBlur(`language_name_discount_${i.id}`)}
                        />
                        <Input
                          type="text"
                          value={values[`language_discount_${i.id}`]}
                          variant="outline"
                          isRequired
                          isInvalid={errors[`language_discount_${i.id}`]}
                          errorBorderColor="red"
                          placeholder="Motivo de descuento"
                          captionLabel="Motivo de descuento"
                          onChange={handleChange(`language_discount_${i.id}`)}
                          onBlur={handleBlur(`language_discount_${i.id}`)}
                        />
                      </Stack>
                    </Stack>
                  ))}
                </Fragment>
                <Flex justify="end" mt={10}>
                  <Button type="submit">Enviar</Button>
                </Flex>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

export default connect(
  (state) => ({
    subscriptions: selectSubscriptions(state),
    languages: selectLanguageLanguages(state),
    countries: selectCountryCountries(state),
    status: selectSubscriptionStatus(state),
  }),
  {
    onFetchSubscriptions: fetch,
    onFetchCountries: fetchCountries,
    onFetchLanguages: fetchLanguages,
  },
)(DiscountForm);
