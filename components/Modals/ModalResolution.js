import {Fragment, useEffect, useState, useCallback} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Textarea,
  ModalFooter,
} from '@chakra-ui/react';
import Button from '../Button';
import Loading from '../Loading';

const ModalResolution = ({
  isOpen,
  onClose,
  post,
  isFetching,
  onPressResolved,
}) => {
  const [message, setMessage] = useState('');
  const handleOnChangeText = useCallback((e) => setMessage(e.target.value), []);
  const handleOnClick = useCallback(
    () => onPressResolved(message),
    [message, onPressResolved],
  );
  useEffect(() => {
    setMessage('');
  }, [post]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={12} fontWeight="bold">
            Comentario:
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            {!isFetching ? (
              <Fragment>
                <Stack direction="row">
                  <Text fontWeight="bold">Username:</Text>
                  <Text>{post?.username}</Text>
                </Stack>
                <Stack direction="row">
                  <Text fontWeight="bold">Comentario:</Text>
                  <Text overflow="auto">{post?.description}</Text>
                </Stack>
              </Fragment>
            ) : (
              <Loading />
            )}
            <Text fontSize={12} fontWeight="bold">
              Resolución:
            </Text>
            <Textarea
              type="text"
              maxLength={500}
              value={message}
              variant="unstyled"
              placeholder="¿Cual es la resolución?"
              resize="none"
              onChange={handleOnChangeText}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button disabled={!message.length > 0} onClick={handleOnClick}>
            Resolver
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalResolution;
