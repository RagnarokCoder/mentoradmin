import {useState, useEffect, useMemo, useCallback} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Stack,
  HStack,
  Image,
  CheckboxGroup,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import {Form, Formik} from 'formik';
import addCompetitionSchema from '../../forms/schemas/addCompetitionSchema';
import Button from '../Button';
import Input from '../Input';

const AddCompetition = ({
  onSubmit,
  isOpen,
  onClose,
  isEdit,
  sports,
  teams,
  competition,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [valuesSelected, setValuesSelected] = useState();
  const [teamsList, setTeamsList] = useState([]);
  useEffect(() => {
    if (searchValue.length > 0) {
      const listFilter = teams?.data.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setTeamsList(listFilter);
    } else {
      setTeamsList(teams?.data);
    }
  }, [searchValue, teams]);
  useEffect(() => {
    if (competition?.teams.length > 0) {
      setValuesSelected(competition?.teams.map((i) => i.id));
    }
  }, [competition]);
  const teamsSelected = useMemo(
    () =>
      valuesSelected?.map((value) =>
        teams?.data.find((item) => item.id === value),
      ),
    [teams, valuesSelected],
  );
  const handleOnSubmit = useCallback(
    (values) => {
      onSubmit({...values, teamIds: valuesSelected});
      setSearchValue('');
      setValuesSelected([]);
    },
    [onSubmit, valuesSelected],
  );
  return (
    <Modal
      size="3xl"
      onClose={() => {
        setSearchValue('');
        setValuesSelected([]);
        onClose();
      }}
      isOpen={isOpen}>
      <ModalOverlay />
      <Formik
        initialValues={{
          name: competition?.name,
          tierId: competition?.tierId,
          sportId: competition?.sportId,
        }}
        validationSchema={addCompetitionSchema}
        onSubmit={handleOnSubmit}>
        {({handleChange, handleBlur, errors, values}) => (
          <Form>
            <ModalContent>
              <ModalHeader>Complete el formulario</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <Input
                    type="name"
                    captionLabel="Name"
                    value={values.name}
                    placeholder="Name"
                    variant="outline"
                    isRequired
                    maxLength={100}
                    isInvalid={errors.name}
                    errorBorderColor="red"
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  <Select
                    isRequired
                    isInvalid={errors.sport}
                    defaultValue={values.sportId}
                    errorBorderColor="red"
                    placeholder="Select Sport"
                    onChange={handleChange('sportId')}
                    onBlur={handleBlur('sportId')}>
                    {sports.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                  <Stack direction="row">
                    <Stack flex={1} spacing={4}>
                      <Input
                        type="search"
                        placeholder="Search"
                        variant="outline"
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <CheckboxGroup
                        isRequired
                        colorScheme="green"
                        value={valuesSelected}
                        onChange={setValuesSelected}>
                        <Stack overflow="scroll" h={300} direction="column">
                          {teamsList.map((t) => (
                            <Stack
                              spacing={2}
                              key={t.id}
                              direction="row"
                              alignItems="center">
                              <Stack
                                spacing={2}
                                direction="row"
                                alignItems="center"
                                flex={1}>
                                <Image
                                  alignSelf="flex-end"
                                  boxSize="50px"
                                  objectFit="contain"
                                  src={t.pictureUrl}
                                  alt="Logo"
                                />
                                <Text>{t.name}</Text>
                              </Stack>
                              <Checkbox paddingX={4} value={t.id} />
                            </Stack>
                          ))}
                        </Stack>
                      </CheckboxGroup>
                    </Stack>
                    <Stack flex={1} overflow="scroll" h={360}>
                      <Text>Equipos agregados: </Text>
                      {teamsSelected?.map((t) => (
                        <Stack
                          key={t.id}
                          spacing={2}
                          direction="row"
                          alignItems="center">
                          <Image
                            alignSelf="flex-end"
                            boxSize="50px"
                            objectFit="contain"
                            src={t.pictureUrl}
                            alt="Logo"
                          />
                          <Text>{t.name}</Text>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <HStack w="100%" justifyContent="flex-end">
                  <Button
                    disabled={!teamsSelected || teamsSelected.length === 0}
                    type="submit">
                    {isEdit ? 'Modificar' : 'Crear'}
                  </Button>
                </HStack>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCompetition;
