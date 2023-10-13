import {Fragment, useCallback, useEffect, useState} from 'react';
import {
  Select,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import ModalSearchUser from '../Modals/ModalSearchUser';
import ModalConfirmation from '../Modals/ModalConfirmation';
import {Form, Formik} from 'formik';
import Button from '../Button';
import Input from '../Input';
import subscriptionManagerSchema from '../../forms/schemas/subscriptionManagerSchema';
import {formatBytes, validateMaxSize} from '../../utils/constants';

const AddSubscription = ({sports, userAssigned, onSubmit, valueToEdit}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const modalconfirmation = useDisclosure();
  const [formPicture, setFormPicture] = useState();
  const [defaultValues, setDefaultValues] = useState();
  const [restarting, setRestarting] = useState(false);
  const [assignedUser, setAssignedUser] = useState();
  const [errorAssignedUser, setErrorAssignedUser] = useState(false);
  const handleOnChangeFile = useCallback((e) => {
    if (e.target.files.length) {
      const upload_file = e.target.files[0];
      const bytes = formatBytes(upload_file.size);
      const isValid = validateMaxSize(bytes.split(' ')[0], bytes.split(' ')[1]);
      if (isValid) {
        setFormPicture(upload_file);
      } else {
      }
    }
  }, []);
  const handleOnSubmit = useCallback(
    (values) => {
      if (assignedUser) {
        setErrorAssignedUser(false);
        onSubmit({...values, file: formPicture, assignedUser});
      } else {
        setErrorAssignedUser(true);
      }
    },
    [formPicture, onSubmit, assignedUser],
  );

  useEffect(() => {
    if (valueToEdit) {
      setDefaultValues(valueToEdit);
      resetForm();
    }
  }, [valueToEdit]);

  useEffect(() => {
    setAssignedUser(userAssigned);
  }, [userAssigned]);

  const resetForm = () => {
    setRestarting(true);
    setTimeout(() => {
      setRestarting(false);
    }, 1);
  };

  const handleOnSelectUser = (user) => {
    setAssignedUser(user);
    setErrorAssignedUser(false);
    onClose();
  };

  return (
    <Fragment>
      <ModalSearchUser
        role="analist"
        isOpen={isOpen}
        onClose={onClose}
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
          initialValues={{...defaultValues}}
          validationSchema={subscriptionManagerSchema}
          onSubmit={(values) => handleOnSubmit(values)}>
          {({handleChange, handleBlur, errors, values}) => (
            <Form>
              <Text size="15px" color="black" fontWeight="bold">
                Detalles de la suscripción
              </Text>
              <SimpleGrid columns={[1, 2]} spacing={4} alignItems="end">
                <Input
                  type="date"
                  value={values.startDate}
                  variant="outline"
                  isRequired
                  isInvalid={errors.startDate}
                  errorBorderColor="red"
                  captionLabel="Fecha de inicio"
                  placeholder="Fecha de inicio"
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
                  captionLabel="Fecha de finalización"
                  placeholder="Fecha de finalización"
                  onChange={handleChange('endDate')}
                  onBlur={handleBlur('endDate')}
                />
                <Input
                  type="date"
                  value={values.preSaleDate}
                  variant="outline"
                  isRequired
                  isInvalid={errors.preSaleDate}
                  errorBorderColor="red"
                  captionLabel="Fecha de preventa"
                  placeholder="Fecha de preventa"
                  onChange={handleChange('preSaleDate')}
                  onBlur={handleBlur('preSaleDate')}
                />
                <Select
                  isRequired
                  defaultValue={values.sports}
                  isInvalid={errors.sports}
                  errorBorderColor="red"
                  placeholder="Seleccionar Deporte"
                  onChange={handleChange('sports')}
                  onBlur={handleBlur('sports')}>
                  {sports?.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
                <Input
                  type="file"
                  placeholder="Logo"
                  variant="unstyled"
                  accept="image/*"
                  isRequired={valueToEdit ? false : true}
                  onChange={handleOnChangeFile}
                  onBlur={handleBlur('file')}
                />
              </SimpleGrid>
              <Stack my={4}>
                <Button
                  variant="outline"
                  color="black.100"
                  borderColor={errorAssignedUser ? 'red' : 'green.100'}
                  background={undefined}
                  onClick={onOpen}>
                  Seleccionar analista a cargo
                </Button>
                {assignedUser && (
                  <Stack direction="row">
                    <Text fontWeight="bold">Usuario Seleccionado: </Text>
                    <Text>{`${assignedUser.firstName} ${assignedUser.lastName}`}</Text>
                  </Stack>
                )}
              </Stack>
              <Flex justify="end">
                <Button type="submit">
                  {valueToEdit
                    ? 'Modificar suscripción'
                    : 'Agregar suscripción'}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

export default AddSubscription;
