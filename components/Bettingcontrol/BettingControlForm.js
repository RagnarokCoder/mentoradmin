import {useEffect, useState} from 'react';
import {Stack, Flex, SimpleGrid, Select, Text} from '@chakra-ui/react';
import {Form, Formik} from 'formik';
import Button from '../Button';
import Input from '../Input';
import bettingControlSchema from '../../forms/schemas/bettingControlSchema';

const Forecasts = [
  {id: 'win', name: 'Win'},
  {id: 'lose', name: 'Lose'},
  {id: 'push', name: 'Push'},
  {id: 'canceled', name: 'Canceled'},
];

const BettingControlForm = ({
  languages,
  onSubmit,
  initialValues,
  buttonLabel,
}) => {
  const [defaultValues, setDefaultValues] = useState();
  const [restarting, setRestarting] = useState(false);
  const resetForm = () => {
    setRestarting(true);
    setTimeout(() => {
      setRestarting(false);
    }, 1);
  };
  useEffect(() => {
    if (initialValues) {
      setDefaultValues(initialValues);
      resetForm();
    }
  }, [initialValues]);
  return (
    !restarting && (
      <Formik
        initialValues={{...defaultValues}}
        validationSchema={bettingControlSchema}
        onSubmit={(values) => {
          onSubmit(values);
          resetForm();
        }}>
        {({handleChange, handleBlur, errors, values}) => (
          <Form>
            <Stack
              bg="white"
              borderRadius="12px"
              p={6}
              boxShadow="lg"
              display="flex"
              flex={1}>
              <Text fontWeight="bold" fontSize="20px">
                Control de apuestas
              </Text>
              <SimpleGrid columns={[1, 2]} spacing={4} alignItems="end">
                <Input
                  type="text"
                  value={values.team1}
                  variant="outline"
                  disabled
                  isInvalid={errors.team1}
                  errorBorderColor="red"
                  placeholder="Equipo 1"
                  captionLabel="Equipo 1"
                  onChange={handleChange('team1')}
                  onBlur={handleBlur('team1')}
                />
                <Input
                  type="number"
                  value={values.team1Result}
                  variant="outline"
                  isRequired
                  isInvalid={errors.team1Result}
                  errorBorderColor="red"
                  placeholder="Resultado"
                  onChange={handleChange('team1Result')}
                  onBlur={handleBlur('team1Result')}
                />
                <Input
                  type="text"
                  value={values.team2}
                  variant="outline"
                  disabled
                  isInvalid={errors.team2}
                  errorBorderColor="red"
                  placeholder="Equipo 2"
                  captionLabel="Equipo 2"
                  onChange={handleChange('team2')}
                  onBlur={handleBlur('team2')}
                />
                <Input
                  type="number"
                  value={values.team2Result}
                  variant="outline"
                  isRequired
                  isInvalid={errors.team2Result}
                  errorBorderColor="red"
                  placeholder="Resultado"
                  onChange={handleChange('team2Result')}
                  onBlur={handleBlur('team2Result')}
                />
                {languages?.map((i) => (
                  <Input
                    key={i.id}
                    type="text"
                    value={values[`language_pick_${i.id}`]}
                    variant="outline"
                    disabled
                    isInvalid={errors[`language_pick_${i.id}`]}
                    errorBorderColor="red"
                    placeholder={`Pick en ${i.name}`}
                    captionLabel={`Pick en ${i.name}`}
                    onChange={handleChange(`language_pick_${i.id}`)}
                    onBlur={handleBlur(`language_pick_${i.id}`)}
                  />
                ))}
                <Select
                  isRequired
                  defaultValue={values.forecast}
                  isInvalid={errors.forecast}
                  errorBorderColor="red"
                  placeholder="Pronóstico"
                  onChange={handleChange('forecast')}
                  onBlur={handleBlur('forecast')}>
                  {Forecasts.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
                <Input
                  type="number"
                  value={values.recommendedInvestment}
                  variant="outline"
                  disabled
                  isInvalid={errors.recommendedInvestment}
                  errorBorderColor="red"
                  placeholder="Inversión recomendada"
                  captionLabel="Inversión recomendada"
                  onChange={handleChange('recommendedInvestment')}
                  onBlur={handleBlur('recommendedInvestment')}
                />
                <Input
                  type="number"
                  value={values.benefit}
                  variant="outline"
                  isRequired
                  disabled
                  isInvalid={errors.benefit}
                  errorBorderColor="red"
                  placeholder="Beneficio"
                  captionLabel="Beneficio"
                  onChange={handleChange('benefit')}
                  onBlur={handleBlur('benefit')}
                />
                <Input
                  type="text"
                  value={values.subscription}
                  variant="outline"
                  disabled
                  isInvalid={errors.subscription}
                  errorBorderColor="red"
                  placeholder="Suscripción"
                  captionLabel="Suscripción"
                  onChange={handleChange('subscription')}
                  onBlur={handleBlur('subscription')}
                />
              </SimpleGrid>
            </Stack>
            <Flex justify="end" mt={10}>
              <Button type="submit">{buttonLabel}</Button>
            </Flex>
          </Form>
        )}
      </Formik>
    )
  );
};

export default BettingControlForm;
