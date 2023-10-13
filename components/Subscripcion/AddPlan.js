import {Fragment, useCallback, useState, useMemo, useEffect} from 'react';
import {
  Stack,
  Flex,
  Text,
  Box,
  Select,
  Textarea,
  SimpleGrid,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import {Form, Formik} from 'formik';
import Button from '../Button';
import Input from '../Input';
import ModalConfirmation from '../Modals/ModalConfirmation';
import buildFormSchema from '../../forms/validations/buildFormSchema';
import Close from '../../assets/Icons/Close';
import {defaultLanguageCode} from '../../utils/constants';
import {schemaForMonthlyPlan, schemaForPlan} from './utils';

const AddPlan = ({
  countries,
  languages,
  plansSubscriptionAdded,
  preSaleDate,
  finishDateSubscription,
  onAddPlan,
  onClickRemovePlan,
}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [valueToEdit, setValueToEdit] = useState();
  const [indexToEdit, setIndexToEdit] = useState();
  const [schema, setSchema] = useState();
  const [countryAdded, setCountryAdded] = useState([]);
  const [benefitsAdded, setBenefitsAdded] = useState([]);
  const [restarting, setRestarting] = useState(false);
  const [planMonthly, setPlanMonthly] = useState(false);

  const _countries = useMemo(
    () =>
      countries
        ?.filter((f) => f.code.toLowerCase() !== 'us')
        .sort((x, y) => {
          if (x.name > y.name) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((c) => {
          return {
            id: c.id,
            name: c.name,
            currencyId: c.currencyId,
            code: c.code,
            currencySymbol: c.currencySymbol,
          };
        }),
    [countries],
  );

  const languageIdEN = useMemo(
    () => languages.find((l) => l.code === defaultLanguageCode)?.id,
    [languages],
  );

  useEffect(() => {
    const _languages = [];
    languages?.forEach((l) => {
      _languages.push(
        {
          name: `language_name_plan_${l.id}`,
          type: 'text',
          validations: [
            {
              type: 'required',
              message: 'name date content is required.',
            },
          ],
        },
        {
          name: `language_description_plan_${l.id}`,
          type: 'text',
          validations: [
            {
              type: 'required',
              message: 'description content is required.',
            },
          ],
        },
      );
    });
    planMonthly
      ? setSchema(
          buildFormSchema({
            fields: [
              ...schemaForMonthlyPlan(
                preSaleDate ? preSaleDate : new Date().toISOString(),
                finishDateSubscription
                  ? finishDateSubscription
                  : new Date().toISOString(),
              ),
              ..._languages,
            ],
          }),
        )
      : setSchema(
          buildFormSchema({
            fields: [
              ...schemaForPlan(
                preSaleDate ? preSaleDate : new Date().toISOString(),
                finishDateSubscription
                  ? finishDateSubscription
                  : new Date().toISOString(),
              ),
              ..._languages,
            ],
          }),
        );
  }, [finishDateSubscription, preSaleDate, languages, planMonthly]);

  const handleOnChangeSelect = useCallback(
    (e, index) => {
      const r = _countries.find((i) => i.id === e.target.value);
      countryAdded[index].id = r.id;
      countryAdded[index].currencyId = r.currencyId;
      countryAdded[index].country = r;
      setCountryAdded([...countryAdded]);
    },
    [_countries, countryAdded],
  );

  const handleOnChangeBenefitSelect = useCallback(
    (e, index) => {
      const l = languages.find((i) => i.id === e.target.value);
      benefitsAdded[index].languageId = e.target.value;
      benefitsAdded[index].language = l.code;
      setBenefitsAdded([...benefitsAdded]);
    },
    [benefitsAdded, languages],
  );

  const handleOnChangePriceWarranty = useCallback(
    (e, index) => {
      countryAdded[index].priceWarranty = e;
      setCountryAdded([...countryAdded]);
    },
    [countryAdded],
  );

  const handleOnChangeBenefits = useCallback(
    (e, index) => {
      benefitsAdded[index].name = e.target.value;
      setBenefitsAdded([...benefitsAdded]);
    },
    [benefitsAdded],
  );

  const handleOnChangePrice = useCallback(
    (e, index) => {
      countryAdded[index].price = e;
      setCountryAdded([...countryAdded]);
    },
    [countryAdded],
  );

  const handleRemoveItem = useCallback(
    (index) => {
      countryAdded.splice(index, 1);
      setCountryAdded([...countryAdded]);
    },
    [countryAdded],
  );

  const handleRemoveItemBenefit = useCallback(
    (index) => {
      benefitsAdded.splice(index, 1);
      setBenefitsAdded([...benefitsAdded]);
    },
    [benefitsAdded],
  );

  const handleAddItem = useCallback(() => {
    setCountryAdded([
      ...countryAdded,
      {
        value: _countries?.[0].id,
        currencyId: _countries?.[0].currencyId,
        price: null,
        priceWarranty: null,
        country: _countries?.[0],
      },
    ]);
  }, [countryAdded, _countries]);

  const handleAddbenefitItem = useCallback(() => {
    setBenefitsAdded([
      ...benefitsAdded,
      {
        name: null,
        languageId: languages?.[0].id,
        language: languages?.[0].code,
      },
    ]);
  }, [benefitsAdded, languages]);

  const resetForm = () => {
    setRestarting(true);
    setTimeout(() => {
      setRestarting(false);
    }, 1);
  };

  const handleOnClickEdit = (index) => {
    const item = plansSubscriptionAdded[index];
    if (item.benefitsAdded) {
      setBenefitsAdded(
        item.benefitsAdded.map((b) => {
          return {...b};
        }),
      );
    }
    if (item.pricesAdded) {
      setCountryAdded(
        item.pricesAdded.map((b) => {
          return {...b};
        }),
      );
    }
    setPlanMonthly(item.planMonthly);
    setValueToEdit(item);
    setIndexToEdit(index);
    resetForm();
  };

  const handleOnClickCancel = () => {
    setCountryAdded([]);
    setBenefitsAdded([]);
    setValueToEdit();
    setIndexToEdit();
    setPlanMonthly();
    resetForm();
  };

  const handleOnConfirmDelete = () => {
    setCountryAdded([]);
    setBenefitsAdded([]);
    setValueToEdit();
    setIndexToEdit();
    setPlanMonthly();
    onClickRemovePlan(indexToEdit, valueToEdit);
    resetForm();
  };

  const ifDuplicateCountries = () => {
    let resultToReturn = false;
    for (let i = 0; i < countryAdded.length; i++) {
      for (let j = 0; j < countryAdded.length; j++) {
        if (i !== j) {
          if (countryAdded[i].country.id === countryAdded[j].country.id) {
            resultToReturn = true;
            break;
          }
        }
      }
      if (resultToReturn) {
        break;
      }
    }
    return resultToReturn;
  };

  const onHandleSubmit = (values) => {
    if (ifDuplicateCountries()) {
      onOpen();
    } else {
      onAddPlan(
        {
          ...values,
          pricesAdded: countryAdded,
          benefitsAdded: benefitsAdded,
          planMonthly,
        },
        indexToEdit,
      );
      setCountryAdded([]);
      setIndexToEdit();
      setValueToEdit();
      setPlanMonthly();
      setBenefitsAdded([]);
      resetForm();
    }
  };

  return (
    <Stack direction={['column', 'row']}>
      <ModalConfirmation
        title="Paises duplicados"
        info="Ha agregado uno o mas paises duplicados, por favor revise la lista y vuelva a intentarlo."
        buttons={[<Button onClick={onClose}>Aceptar</Button>]}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Stack
        boxShadow="lg"
        bg="white"
        borderRadius="12px"
        p={6}
        display="flex"
        flex={0.7}>
        {!restarting && (
          <Formik
            initialValues={{...valueToEdit}}
            validationSchema={schema}
            onSubmit={onHandleSubmit}>
            {({handleChange, handleBlur, errors, values}) => (
              <Form>
                <Stack direction="row" align="center" justify="space-between">
                  <Text my={4} fontSize="16px" fontWeight="bold">
                    Carga de planes
                  </Text>
                  <Stack direction="row" align="center">
                    <Text>Plan mensual: </Text>
                    <Switch
                      isChecked={planMonthly}
                      onChange={(e) => setPlanMonthly(e.target.checked)}
                      colorScheme="teal"
                      size="lg"
                    />
                  </Stack>
                </Stack>
                <SimpleGrid columns={[1, 2]} spacing={2} alignItems="end">
                  {!planMonthly && (
                    <Fragment>
                      <Text fontSize="13px">Fecha de picks</Text>
                      <Box />
                      <Input
                        type="date"
                        value={values.startDatePicks}
                        variant="outline"
                        isRequired
                        isInvalid={errors.startDatePicks}
                        errorBorderColor="red"
                        placeholder="Desde"
                        captionLabel="Inicio"
                        onChange={handleChange('startDatePicks')}
                        onBlur={handleBlur('startDatePicks')}
                      />
                      <Input
                        type="date"
                        value={values.endDatePicks}
                        variant="outline"
                        isRequired
                        isInvalid={errors.endDatePicks}
                        errorBorderColor="red"
                        placeholder="Hasta"
                        captionLabel="Fin"
                        onChange={handleChange('endDatePicks')}
                        onBlur={handleBlur('endDatePicks')}
                      />
                    </Fragment>
                  )}
                  <Text fontSize="13px">Fecha de compra</Text>
                  <Box />
                  <Input
                    type="date"
                    value={values.startDate}
                    variant="outline"
                    isRequired
                    isInvalid={errors.startDate}
                    errorBorderColor="red"
                    placeholder="Desde"
                    captionLabel="Inicio"
                    onChange={handleChange('startDate')}
                    onBlur={handleBlur('startDate')}
                  />
                  <Input
                    type="date"
                    value={values.endDate}
                    variant="outline"
                    isRequired
                    isInvalid={errors.endDate}
                    errorBorderColor="red"
                    placeholder="Hasta"
                    captionLabel="Fin"
                    onChange={handleChange('endDate')}
                    onBlur={handleBlur('endDate')}
                  />
                </SimpleGrid>
                <Text my={4} fontSize="16px" fontWeight="bold">
                  Idiomas
                </Text>
                {languages?.map((i) => (
                  <Stack key={i.id} mt={4}>
                    <Text fontSize="12px" color="black" fontWeight="bold">
                      {i.name}
                    </Text>
                    <Input
                      type="text"
                      value={values[`language_name_plan_${i.id}`]}
                      variant="outline"
                      isRequired
                      isInvalid={errors[`language_name_plan_${i.id}`]}
                      errorBorderColor="red"
                      placeholder="Name"
                      onChange={handleChange(`language_name_plan_${i.id}`)}
                      onBlur={handleBlur(`language_name_plan_${i.id}`)}
                    />
                    <Textarea
                      type="text"
                      value={values[`language_description_plan_${i.id}`]}
                      variant="outline"
                      isRequired
                      isInvalid={errors[`language_description_plan_${i.id}`]}
                      errorBorderColor="red"
                      placeholder="Description"
                      onChange={handleChange(
                        `language_description_plan_${i.id}`,
                      )}
                      onBlur={handleBlur(`language_description_plan_${i.id}`)}
                    />
                  </Stack>
                ))}
                <Text my={4} fontSize="16px" fontWeight="bold">
                  Precios
                </Text>
                <Stack direction="row">
                  <Stack flex={1}>
                    <Text fontSize="13px">Precio</Text>
                    <InputGroup>
                      <InputLeftAddon children="u$s" />
                      <Input
                        type="number"
                        value={values.normalPriceDollar}
                        variant="outline"
                        isRequired
                        isInvalid={errors.normalPriceDollar}
                        errorBorderColor="red"
                        onChange={handleChange('normalPriceDollar')}
                        onBlur={handleBlur('normalPriceDollar')}
                      />
                    </InputGroup>
                  </Stack>
                  <Stack flex={1}>
                    <Text fontSize="13px">Precio con garantía</Text>
                    <InputGroup>
                      <InputLeftAddon children="u$s" />
                      <Input
                        type="number"
                        value={values.warrantyPriceDollar}
                        variant="outline"
                        isRequired
                        isInvalid={errors.warrantyPriceDollar}
                        errorBorderColor="red"
                        onChange={handleChange('warrantyPriceDollar')}
                        onBlur={handleBlur('warrantyPriceDollar')}
                      />
                    </InputGroup>
                  </Stack>
                </Stack>
                {countryAdded.map((i, index) => (
                  <Stack
                    my={4}
                    direction="row"
                    align={['center', 'end']}
                    key={index}>
                    <Stack
                      direction={['column', 'row']}
                      align={['stretch', 'end']}>
                      <Stack flex={1}>
                        <Select
                          defaultValue={i.id}
                          onChange={(e) => handleOnChangeSelect(e, index)}>
                          {_countries?.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </Select>
                      </Stack>
                      <Stack flex={1}>
                        <Text fontSize="13px">Precio</Text>
                        <InputGroup>
                          <InputLeftAddon
                            children={i.country?.currencySymbol}
                          />
                          <NumberInput
                            min={1}
                            max={
                              i.priceWarranty
                                ? Number(i.priceWarranty) - 1
                                : undefined
                            }
                            defaultValue={i.price}
                            onChange={(e) => handleOnChangePrice(e, index)}>
                            <NumberInputField placeholder="Precio" />
                          </NumberInput>
                        </InputGroup>
                      </Stack>
                      <Stack flex={1}>
                        <Text fontSize="13px">Precio con garantía</Text>
                        <InputGroup>
                          <InputLeftAddon
                            children={i.country?.currencySymbol}
                          />
                          <NumberInput
                            defaultValue={i.priceWarranty}
                            min={i.price ? Number(i.price) + 1 : undefined}
                            onChange={(e) =>
                              handleOnChangePriceWarranty(e, index)
                            }
                            placeholder="Precio con garantía">
                            <NumberInputField placeholder="Precio con garantía" />
                          </NumberInput>
                        </InputGroup>
                      </Stack>
                    </Stack>
                    <Button
                      pb={4}
                      onClick={() => handleRemoveItem(index)}
                      background={undefined}
                      variant="link">
                      <Close color="black" />
                    </Button>
                  </Stack>
                ))}
                <Flex py={4} justify="end">
                  <Button
                    onClick={handleAddItem}
                    background={undefined}
                    color="black"
                    variant="link"
                    fontSize="12px">
                    + Agregar precio
                  </Button>
                </Flex>
                <Text my={4} fontSize="16px" fontWeight="bold">
                  Beneficios
                </Text>
                {benefitsAdded.map((i, index) => (
                  <Stack my={4} direction="row" key={index}>
                    <Select
                      defaultValue={i.languageId}
                      onChange={(e) => handleOnChangeBenefitSelect(e, index)}>
                      {languages?.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </Select>
                    <Input
                      value={i.name}
                      onChange={(e) => handleOnChangeBenefits(e, index)}
                      type="text"
                      placeholder="Beneficio"
                    />
                    <Button
                      onClick={() => handleRemoveItemBenefit(index)}
                      background={undefined}
                      variant="link">
                      <Close color="black" />
                    </Button>
                  </Stack>
                ))}
                <Flex py={4} justify="end">
                  <Button
                    background={undefined}
                    onClick={handleAddbenefitItem}
                    color="black"
                    variant="link"
                    fontSize="12px">
                    + Agregar beneficio
                  </Button>
                </Flex>
                <Stack my={4} direction="row" justify="end">
                  {indexToEdit !== undefined && (
                    <Fragment>
                      <Button onClick={handleOnConfirmDelete} background="red">
                        Eliminar
                      </Button>
                      <Button onClick={handleOnClickCancel}>Cancelar</Button>
                    </Fragment>
                  )}
                  <Button type="submit">
                    {indexToEdit !== undefined
                      ? 'Modificar plan'
                      : 'Agregar plan'}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
        )
      </Stack>
      <Stack
        bg="white"
        borderRadius="12px"
        p={6}
        boxShadow="lg"
        display="flex"
        flex={0.3}
        overflow="scroll">
        {plansSubscriptionAdded.map((i, index) => (
          <Stack>
            <Text
              _hover={{cursor: 'pointer'}}
              onClick={() => handleOnClickEdit(index)}
              key={index.toString()}
              fontSize="16px"
              fontWeight="bold">
              {`Plan: ${i[`language_name_plan_${languageIdEN}`]}`}
            </Text>
            {i.id && <Text>{`ID: ${i.id.replaceAll('-', '')}`}</Text>}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AddPlan;
