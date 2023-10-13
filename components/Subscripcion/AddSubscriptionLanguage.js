import {Fragment, useState, useEffect} from 'react';
import {Stack, Textarea, Text} from '@chakra-ui/react';
import {Form, Formik} from 'formik';
import Button from '../Button';
import Input from '../Input';
import SubscriptionAdded from './SubscriptionAdded';
import AddSubscription from './AddSubscription';
import SelectCompetitions from './SelectCompetitions';
import Trash from '../../assets/Icons/Trash';
import buildFormSchema from '../../forms/validations/buildFormSchema';

const AddSubscriptionLanguage = ({
  languages,
  competitions,
  onSubmit,
  onSubmitSubscription,
  sports,
  competitionIdsAdded,
  onClickRemoveLeague,
  startDate,
  endDate,
  preSaleDate,
  sportName,
  assignedUser,
  pictureUrl,
  translationsSubscriptionAdded,
  onAddLeague,
  valueToEdit,
}) => {
  const [schema, setSchema] = useState();
  const [defaultValues, setDefaultValues] = useState();
  const [restarting, setRestarting] = useState(false);

  useEffect(() => {
    if (valueToEdit) {
      setDefaultValues(valueToEdit);
      resetForm();
    }
  }, [valueToEdit]);

  useEffect(() => {
    const _languages = [];
    languages?.forEach((l) => {
      _languages.push(
        {
          name: `language_name_subscription_${l.id}`,
          type: 'text',
          validations: [
            {
              type: 'required',
              message: 'language content is required.',
            },
          ],
        },
        {
          name: `language_subheader_subscription_${l.id}`,
          type: 'text',
          validations: [
            {
              type: 'required',
              message: 'subheader content is required.',
            },
          ],
        },
        {
          name: `language_description_subscription_${l.id}`,
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
    setSchema(buildFormSchema({fields: _languages}));
  }, [languages]);

  const resetForm = () => {
    setRestarting(true);
    setTimeout(() => {
      setRestarting(false);
    }, 1);
  };

  return (
    <Stack direction={['column', 'row']}>
      <Stack
        boxShadow="lg"
        bg="white"
        borderRadius="12px"
        p={6}
        display="flex"
        flex={0.7}>
        <AddSubscription
          valueToEdit={defaultValues}
          sports={sports}
          userAssigned={assignedUser}
          onSubmit={onSubmitSubscription}
        />
        <SelectCompetitions
          competitions={competitions}
          onAddLeague={onAddLeague}
        />
        {!restarting && (
          <Formik
            initialValues={{...defaultValues}}
            validationSchema={schema}
            onSubmit={onSubmit}>
            {({handleChange, handleBlur, errors, values}) => (
              <Form>
                <Text mb={2} fontSize="15px" color="black" fontWeight="bold">
                  Detalles del idioma
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
                    <Stack>
                      <Stack direction="row">
                        <Input
                          type="text"
                          value={values[`language_name_subscription_${l.id}`]}
                          variant="outline"
                          isRequired
                          captionLabel="Nombre"
                          isInvalid={
                            errors[`language_name_subscription_${l.id}`]
                          }
                          errorBorderColor="red"
                          placeholder="Nombre"
                          onChange={handleChange(
                            `language_name_subscription_${l.id}`,
                          )}
                          onBlur={handleBlur(
                            `language_name_subscription_${l.id}`,
                          )}
                        />
                        <Input
                          type="text"
                          value={
                            values[`language_subheader_subscription_${l.id}`]
                          }
                          variant="outline"
                          isRequired
                          isInvalid={
                            errors[`language_subheader_subscription_${l.id}`]
                          }
                          errorBorderColor="red"
                          captionLabel="Subheader"
                          placeholder="Subheader"
                          onChange={handleChange(
                            `language_subheader_subscription_${l.id}`,
                          )}
                          onBlur={handleBlur(
                            `language_subheader_subscription_${l.id}`,
                          )}
                        />
                      </Stack>
                    </Stack>
                    <Textarea
                      my={2}
                      type="text"
                      value={
                        values[`language_description_subscription_${l.id}`]
                      }
                      variant="outline"
                      isRequired
                      isInvalid={
                        errors[`language_description_subscription_${l.id}`]
                      }
                      errorBorderColor="red"
                      maxLength={500}
                      placeholder="Description"
                      onChange={handleChange(
                        `language_description_subscription_${l.id}`,
                      )}
                      onBlur={handleBlur(
                        `language_description_subscription_${l.id}`,
                      )}
                    />
                  </Fragment>
                ))}
                <Stack direction="row" justify="end">
                  <Button type="submit">
                    {valueToEdit ? 'Editar idioma' : 'Agregar idioma'}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
      </Stack>
      <Stack
        bg="white"
        borderRadius="12px"
        p={6}
        boxShadow="lg"
        overflow="scroll"
        display="flex"
        flex={0.3}>
        {startDate && endDate && sportName && pictureUrl && (
          <Fragment>
            <Text size="15px" color="black" fontWeight="bold">
              Suscripción
            </Text>
            <SubscriptionAdded
              startDate={startDate}
              endDate={endDate}
              preSaleDate={preSaleDate}
              sportName={sportName}
              assignedUser={assignedUser}
              pictureUrl={pictureUrl}
            />
          </Fragment>
        )}
        {competitionIdsAdded.length > 0 && (
          <Fragment>
            <Text size="15px" color="black" fontWeight="bold">
              Competiciones
            </Text>
            {competitionIdsAdded.map((c, index) => (
              <Stack
                key={index.toString()}
                direction="row"
                justify="space-between">
                <Text fontSize="11px" fontWeight="bold">
                  {c.name}
                </Text>
                <Button
                  onClick={() => onClickRemoveLeague(c)}
                  background={undefined}
                  variant="link">
                  <Trash color="black" />
                </Button>
              </Stack>
            ))}
          </Fragment>
        )}
        {translationsSubscriptionAdded.length > 0 && (
          <Fragment>
            <Text size="15px" color="black" fontWeight="bold">
              Idiomas
            </Text>
            {translationsSubscriptionAdded.map((i, index) => (
              <Text key={index.toString()} fontSize="13px" color="gray.700">
                {`Idioma: ${i.languageName}`}
              </Text>
            ))}
          </Fragment>
        )}
      </Stack>
    </Stack>
  );
};

export default AddSubscriptionLanguage;
