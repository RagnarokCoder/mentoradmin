import {Spinner} from '@chakra-ui/react';

const Loading = () => (
  <Spinner
    zIndex="tooltip"
    position="absolute"
    top="50%"
    left="50%"
    size="md"
  />
);

export default Loading;
