import {Fragment} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from '@chakra-ui/react';

const ModalConfirmation = ({title, info, buttons, isOpen, onClose}) => (
  <Modal isCentered onClose={onClose} isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{info}</ModalBody>
      <ModalFooter>
        <Stack direction="row" spacing={2}>
          {buttons.map((item, index) => (
            <Fragment key={index.toString()}>{item}</Fragment>
          ))}
        </Stack>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ModalConfirmation;
