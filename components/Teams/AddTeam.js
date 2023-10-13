import {useState, useEffect, useCallback} from 'react';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Image,
  HStack,
  Box,
} from '@chakra-ui/react';
import {Form, Formik} from 'formik';
import addTeamSchema from '../../forms/schemas/addTeamSchema';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {formatBytes, validateMaxSize} from '../../utils/constants';

const AddTeam = ({onSubmit, onClose, isOpen, name, file, isEdit}) => {
  const [currentPicture, setCurrentPicture] = useState();
  const [formPicture, setFormPicture] = useState();
  const [imageNotValid, setImageNotValid] = useState();
  useEffect(() => {
    setCurrentPicture(file);
  }, [file]);

  const handleOnSubmit = useCallback(
    (values) => {
      onSubmit({...values, file: formPicture});
    },
    [formPicture, onSubmit],
  );

  const handleOnChangeFile = useCallback((e) => {
    if (e.target.files.length) {
      const upload_file = e.target.files[0];
      const bytes = formatBytes(upload_file.size);
      const isValid = validateMaxSize(bytes.split(' ')[0], bytes.split(' ')[1]);
      if (isValid) {
        setImageNotValid();
        setCurrentPicture(URL.createObjectURL(upload_file));
        setFormPicture(upload_file);
      } else {
        setImageNotValid(
          'La imagen es demasiado grande, por favor seleccione otra, tamaño maximo 5 MB',
        );
      }
    }
  }, []);

  const handleOnClose = useCallback(() => {
    setCurrentPicture();
    onClose();
  }, [onClose]);

  return (
    <Modal isCentered onClose={handleOnClose} isOpen={isOpen}>
      <ModalOverlay />
      <Formik
        initialValues={{name, file}}
        validationSchema={addTeamSchema}
        onSubmit={handleOnSubmit}>
        {({handleChange, handleBlur, errors, values}) => (
          <Form>
            <ModalContent>
              <ModalHeader>Ingrese los valores</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <Input
                    type="name"
                    value={values.name}
                    placeholder="Name"
                    captionLabel="Name"
                    variant="outline"
                    isRequired
                    isInvalid={errors.name}
                    errorBorderColor="red"
                    autoFocus
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  <Input
                    type="file"
                    placeholder="Logo"
                    variant="unstyled"
                    accept="image/*"
                    isRequired={isEdit ? false : true}
                    onChange={handleOnChangeFile}
                    onBlur={handleBlur('file')}
                  />
                  {imageNotValid && (
                    <Text color="red" fontSize="12px">
                      {imageNotValid}
                    </Text>
                  )}
                </Stack>
              </ModalBody>
              <ModalFooter>
                <HStack w="100%" justifyContent="space-between">
                  {currentPicture ? (
                    <Image
                      boxSize="50px"
                      objectFit="contain"
                      src={currentPicture}
                      alt="Logo"
                    />
                  ) : (
                    <Box as="div" />
                  )}
                  <Button type="submit">
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

export default AddTeam;
