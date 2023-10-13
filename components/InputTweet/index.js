import {useState, useCallback, useRef} from 'react';
import {Stack, Textarea, Box, Image, useDisclosure} from '@chakra-ui/react';
import ModalConfirmation from '../Modals/ModalConfirmation';
import Input from '../Input';
import Button from '../Button';
import Images from '../../assets/Icons/Images';
import Trash from '../../assets/Icons/Trash';
import {formatBytes, validateMaxSize} from '../../utils/constants';

const InputTweet = ({profilePhoto, onComment}) => {
  const {onClose, onOpen, isOpen} = useDisclosure();
  const inputButton = useRef();
  const [message, setMessage] = useState('');
  const [picture, setPicture] = useState();
  const [currentPicture, setCurrentPicture] = useState();
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
          setPicture(upload_file);
          setCurrentPicture(URL.createObjectURL(upload_file));
        } else {
          onOpen();
        }
      }
    },
    [onOpen],
  );
  const handleOnChangeText = useCallback((e) => setMessage(e.target.value), []);
  const handleOnClickImage = useCallback(() => inputButton.current.click(), []);
  const handleRemovePicture = useCallback(() => {
    setPicture();
    setCurrentPicture();
  }, []);
  const handleOnClickComment = useCallback(() => {
    onComment(message, picture);
    setPicture();
    setCurrentPicture();
    setMessage('');
  }, [message, onComment, picture]);
  return (
    <Stack direction="row" flex={1}>
      <ModalConfirmation
        title="Imagen demasiado grande"
        info="La imagen es demasiado grande, por favor seleccione otra, tamaño maximo 5 MB"
        buttons={[<Button onClick={onClose}>Aceptar</Button>]}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Image
        alt="Photo profile"
        boxSize="48px"
        borderRadius="full"
        objectFit="cover"
        src={profilePhoto}
      />
      <Stack flex={1}>
        <Textarea
          type="text"
          maxLength={500}
          value={message}
          variant="unstyled"
          placeholder="¿Que estás pensando?"
          resize="none"
          onChange={handleOnChangeText}
        />
        {currentPicture && (
          <Box pos="relative" flex={1}>
            <Button
              pos="absolute"
              right={4}
              top={4}
              onClick={handleRemovePicture}
              borderRadius="full"
              background="white">
              <Trash color="black" />
            </Button>
            <Image
              width="full"
              alt="Picture"
              borderRadius="16px"
              objectFit="cover"
              src={currentPicture}
            />
          </Box>
        )}
        <Stack direction="row" justify="space-between" align="center">
          <Input
            ref={inputButton}
            type="file"
            variant="unstyled"
            accept="image/*"
            display="none"
            onChange={handleOnChangeFile}
          />
          <Images
            _hover={{
              cursor: 'pointer',
            }}
            onClick={handleOnClickImage}
            height="24px"
            width="24px"
            color="green.100"
          />
          <Button
            onClick={handleOnClickComment}
            disabled={message.trim().length === 0}
            borderRadius="full">
            Comentar
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InputTweet;
