import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
  Text,
} from '@chakra-ui/react';
import Button from '../Button';
import Input from '../Input';
import {Form, Formik} from 'formik';
import addUserSchema from '../../forms/schemas/addUserSchema';

const ModalAddUser = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  isFetching,
  error,
}) => (
  <Modal onClose={onClose} isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Formik
          initialValues={{}}
          validationSchema={addUserSchema}
          onSubmit={onSubmit}>
          {({handleChange, handleBlur, errors, values}) => (
            <Form>
              <Stack spacing={4} p="12px">
                <Input
                  type="text"
                  value={values.firstName}
                  variant="outline"
                  isRequired
                  isInvalid={errors.firstName}
                  errorBorderColor="red"
                  placeholder="Nombre"
                  captionLabel="Nombre"
                  onChange={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                />
                <Input
                  type="text"
                  value={values.lastName}
                  variant="outline"
                  isRequired
                  isInvalid={errors.lastName}
                  errorBorderColor="red"
                  placeholder="Apellido"
                  captionLabel="Apellido"
                  onChange={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                />
                <Input
                  type="text"
                  value={values.username}
                  variant="outline"
                  isRequired
                  isInvalid={errors.username}
                  errorBorderColor="red"
                  placeholder="Usuario"
                  captionLabel="Usuario"
                  onChange={handleChange('username')}
                  onBlur={handleBlur('username')}
                />
                <Input
                  type="text"
                  value={values.email}
                  variant="outline"
                  isRequired
                  isInvalid={errors.email}
                  errorBorderColor="red"
                  placeholder="Email"
                  captionLabel="Email"
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <Input
                  type="password"
                  value={values.password}
                  variant="outline"
                  isRequired
                  isInvalid={errors.password}
                  errorBorderColor="red"
                  placeholder="Password"
                  captionLabel="Password"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                {errors.password && (
                  <Text color="red" fontSize="12px">
                    {errors.password}
                  </Text>
                )}
                <Input
                  type="password"
                  value={values.confirmPassword}
                  variant="outline"
                  isRequired
                  isInvalid={errors.confirmPassword}
                  errorBorderColor="red"
                  placeholder="Confirm Password"
                  captionLabel="Confirm Password"
                  onChange={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <Text color="red" fontSize="12px">
                    {errors.confirmPassword}
                  </Text>
                )}
                <Box h={4} />
                {error && (
                  <Text color="red" fontSize="12px">
                    {error}
                  </Text>
                )}
                <Button type="submit" isLoading={isFetching}>
                  Crear cuenta
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ModalAddUser;
