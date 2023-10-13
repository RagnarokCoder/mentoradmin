import {
  Fragment,
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  Stack,
  SimpleGrid,
  Flex,
  Select,
  Textarea,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {Form, Formik} from 'formik';
import newPickShema from '../../forms/schemas/newPickShema';
import buildFormSchema from '../../forms/validations/buildFormSchema';
import Button from '../Button';
import Input from '../Input';
import Trash from '../../assets/Icons/Trash';
import ModalConfirmation from '../Modals/ModalConfirmation';

const Regex = /^(ftp|http|https):\/\/[^ "]+$/;

const NewPickForm = ({
  languages,
  onSubmit,
  subscriptions,
  competitions,
  teams,
  firstButton,
  secondButton,
  onChangeSubscription,
  onChangeCompetition,
  defaultInfoAddded,
  initialValues,
  subscriptionId,
  defautlValueDraft,
  readOnly = false,
}) => {
  const {onClose, onOpen, isOpen} = useDisclosure();
  const formRef = useRef();
  const [schema, setSchema] = useState();
  const [restarting, setRestarting] = useState(false);
  const [draft, setDraft] = useState();
  const [infoAdded, setInfoAdded] = useState([]);
  const [defaultValues, setDefaultValues] = useState();
  const Subscriptions = useMemo(() => {
    return subscriptions?.data.map((s) => {
      return {id: s.id, name: s.name};
    });
  }, [subscriptions]);
  useEffect(() => {
    if (defaultInfoAddded) {
      setInfoAdded(defaultInfoAddded);
    }
  }, [defaultInfoAddded]);
  useEffect(() => {
    if (initialValues) {
      setDefaultValues(initialValues);
      resetForm();
    }
  }, [initialValues, competitions]);
  useEffect(() => {
    if (subscriptionId) {
      setDefaultValues({subscription: subscriptionId});
      resetForm();
    }
  }, [subscriptionId]);

  useEffect(() => {
    const _languages = [];
    languages?.forEach((l) => {
      _languages.push({
        name: `language_pick_${l.id}`,
        type: 'text',
        validations: [
          {
            type: 'required',
            message: 'pick content is required.',
          },
        ],
      });
    });
    setSchema(buildFormSchema({fields: [...newPickShema, ..._languages]}));
  }, [languages]);

  const handleOnAddTitleDescription = useCallback(
    (lan, _index) => {
      const results = infoAdded.find((i) => i.languageCode === lan.code);
      if (results) {
        results.values.push({title: '', description: ''});
      } else {
        infoAdded.push({
          languageCode: lan.code,
          values: [{title: '', description: ''}],
        });
      }
      setInfoAdded([...infoAdded]);
    },
    [infoAdded],
  );
  const handleOnRemoveTitleDescription = useCallback(
    (lan, index) => {
      const results = infoAdded.find((i) => i.languageCode === lan.code);
      results.values.splice(index, 1);
      setInfoAdded([...infoAdded]);
    },
    [infoAdded],
  );
  const handleOnChangeTitle = useCallback(
    (lan, value, index) => {
      const results = infoAdded.find((i) => i.languageCode === lan.code);
      results.values[index].title = value;
      setInfoAdded([...infoAdded]);
    },
    [infoAdded],
  );
  const handleOnChangeDescription = useCallback(
    (lan, value, index) => {
      const results = infoAdded.find((i) => i.languageCode === lan.code);
      results.values[index].description = value;
      setInfoAdded([...infoAdded]);
    },
    [infoAdded],
  );

  const handleOnSubmit = useCallback(
    (values) => {
      if (values.url) {
        if (!Regex.test(values.url)) {
          onOpen();
          return;
        }
      }
      onSubmit({...values, draft, extraInfo: infoAdded});
      resetForm();
      setInfoAdded([]);
    },
    [draft, infoAdded, onSubmit, onOpen],
  );

  const handleOnClickSaveDraft = useCallback(
    (handleSubmit) => {
      setDraft(defautlValueDraft === undefined ? true : defautlValueDraft);
      handleSubmit();
    },
    [defautlValueDraft],
  );
  const handleOnClickSave = useCallback(
    (handleSubmit) => {
      setDraft(defautlValueDraft === undefined ? false : defautlValueDraft);
      handleSubmit();
    },
    [defautlValueDraft],
  );
  const resetForm = () => {
    setRestarting(true);
    setTimeout(() => {
      setRestarting(false);
    }, 1);
  };
  return (
    !restarting && (
      <Fragment>
        <ModalConfirmation
          title="Error"
          info="La url no es valida"
          buttons={[<Button onClick={onClose}>Aceptar</Button>]}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Formik
          initialValues={{...defaultValues}}
          validationSchema={schema}
          onSubmit={(values) => handleOnSubmit(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <Form ref={formRef}>
              <Stack
                bg="white"
                borderRadius="12px"
                p={6}
                boxShadow="lg"
                display="flex"
                flex={1}>
                <Text fontWeight="bold" fontSize="20px">
                  Crear una pick
                </Text>
                <SimpleGrid columns={[1, 2]} spacing={6}>
                  <Select
                    isRequired
                    disabled={readOnly}
                    defaultValue={values.subscription}
                    isInvalid={errors.subscription}
                    errorBorderColor="red"
                    placeholder="Seleccionar Suscripcion"
                    onChange={(e) => {
                      handleChange('subscription')(e);
                      onChangeSubscription(e.target.value);
                    }}
                    onBlur={handleBlur('subscription')}>
                    {Subscriptions?.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                  <Select
                    isRequired
                    disabled={readOnly}
                    defaultValue={values.competition}
                    isInvalid={errors.competition}
                    errorBorderColor="red"
                    placeholder="Seleccionar Competición"
                    onChange={(e) => {
                      handleChange('competition')(e);
                      onChangeCompetition(e.target.value);
                    }}
                    onBlur={handleBlur('competition')}>
                    {competitions?.data.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                  <Input
                    type="date"
                    disabled={readOnly}
                    value={values.date}
                    variant="outline"
                    isRequired
                    isInvalid={errors.date}
                    errorBorderColor="red"
                    captionLabel="Fecha de la pick"
                    placeholder="Seleccionar fecha"
                    onChange={handleChange('date')}
                    onBlur={handleBlur('date')}
                  />
                  <Input
                    type="time"
                    disabled={readOnly}
                    value={values.time}
                    variant="outline"
                    isRequired
                    isInvalid={errors.time}
                    errorBorderColor="red"
                    captionLabel="Horario del encuentro (UTC)"
                    placeholder="Seleccionar horario"
                    onChange={handleChange('time')}
                    onBlur={handleBlur('time')}
                  />
                  <Select
                    isRequired
                    disabled={readOnly}
                    defaultValue={values.team1}
                    isInvalid={errors.team1}
                    errorBorderColor="red"
                    placeholder="Seleccionar equipo"
                    onChange={handleChange('team1')}
                    onBlur={handleBlur('team1')}>
                    {teams?.data?.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                  <Select
                    isRequired
                    disabled={readOnly}
                    defaultValue={values.team2}
                    isInvalid={errors.team2}
                    errorBorderColor="red"
                    placeholder="Seleccionar equipo"
                    onChange={handleChange('team2')}
                    onBlur={handleBlur('team2')}>
                    {teams?.data?.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                  <Input
                    type="number"
                    disabled={readOnly}
                    value={values.Recommendedinvestment}
                    variant="outline"
                    isRequired
                    isInvalid={errors.Recommendedinvestment}
                    errorBorderColor="red"
                    placeholder="Inversion recomendada"
                    captionLabel="Inversion recomendada"
                    onChange={handleChange('Recommendedinvestment')}
                    onBlur={handleBlur('Recommendedinvestment')}
                  />
                  <Input
                    type="number"
                    disabled={readOnly}
                    value={values.benefit}
                    variant="outline"
                    isRequired
                    isInvalid={errors.benefit}
                    errorBorderColor="red"
                    placeholder="Beneficio"
                    captionLabel="Beneficio"
                    onChange={handleChange('benefit')}
                    onBlur={handleBlur('benefit')}
                  />
                  <Input
                    type="url"
                    disabled={readOnly}
                    value={values.url}
                    variant="outline"
                    isInvalid={errors.url}
                    errorBorderColor="red"
                    placeholder="Link a tutorial"
                    captionLabel="Link a tutorial"
                    maxLength={200}
                    onChange={handleChange('url')}
                    onBlur={handleBlur('url')}
                  />
                </SimpleGrid>
                {languages?.map((i) => (
                  <Stack py={1} key={i.id}>
                    <Input
                      key={i.id}
                      type="text"
                      disabled={readOnly}
                      value={values[`language_pick_${i.id}`]}
                      variant="outline"
                      isRequired
                      isInvalid={errors[`language_pick_${i.id}`]}
                      errorBorderColor="red"
                      maxLength={100}
                      placeholder={`Pick en ${i.name}`}
                      captionLabel={`Pick en ${i.name}`}
                      onChange={handleChange(`language_pick_${i.id}`)}
                      onBlur={handleBlur(`language_pick_${i.id}`)}
                    />
                  </Stack>
                ))}
              </Stack>
              <Stack
                bg="white"
                borderRadius="12px"
                p={6}
                mt={8}
                boxShadow="lg"
                display="flex"
                flex={1}>
                <Text fontWeight="bold" fontSize="20px">
                  Análisis de la pick
                </Text>
                {languages?.map((l, i) => (
                  <Fragment key={i.toString()}>
                    <Text
                      my={2}
                      fontSize="12px"
                      color="black"
                      fontWeight="bold">
                      {l.name}
                    </Text>
                    {infoAdded
                      .find((info) => info.languageCode === l.code)
                      ?.values.map((v, index) => (
                        <Stack key={index} direction="row">
                          <Stack flex={1}>
                            <Input
                              disabled={readOnly}
                              type="text"
                              value={v.title}
                              variant="outline"
                              placeholder="Titulo"
                              onChange={(e) =>
                                handleOnChangeTitle(l, e.target.value, index)
                              }
                            />
                            <Textarea
                              type="text"
                              disabled={readOnly}
                              value={v.description}
                              variant="outline"
                              maxLength={500}
                              placeholder="Descripción"
                              onChange={(e) =>
                                handleOnChangeDescription(
                                  l,
                                  e.target.value,
                                  index,
                                )
                              }
                            />
                          </Stack>
                          {!readOnly && (
                            <Button
                              disabled={readOnly}
                              onClick={() =>
                                handleOnRemoveTitleDescription(l, index)
                              }
                              background={undefined}
                              variant="link">
                              <Trash color="black" />
                            </Button>
                          )}
                        </Stack>
                      ))}
                    {!readOnly && (
                      <Flex py={4} justify="end">
                        <Button
                          disabled={readOnly}
                          onClick={() => handleOnAddTitleDescription(l, i)}
                          background={undefined}
                          color="black"
                          variant="link"
                          fontSize="12px">
                          + Agregar nuevo titulo y descripcion
                        </Button>
                      </Flex>
                    )}
                  </Fragment>
                ))}
              </Stack>
              {!readOnly && (
                <Stack direction="row" mt={10} justify="end">
                  {secondButton && (
                    <Button
                      onClick={() => handleOnClickSaveDraft(handleSubmit)}
                      background="gray.700">
                      {secondButton}
                    </Button>
                  )}
                  <Button onClick={() => handleOnClickSave(handleSubmit)}>
                    {firstButton}
                  </Button>
                </Stack>
              )}
            </Form>
          )}
        </Formik>
      </Fragment>
    )
  );
};

export default NewPickForm;
