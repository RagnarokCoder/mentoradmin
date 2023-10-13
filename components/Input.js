import {forwardRef} from 'react';
import {
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Text,
  Stack,
} from '@chakra-ui/react';

const _Input = forwardRef(({captionLabel, ...props}, ref) =>
  captionLabel ? (
    <Stack flex={1}>
      <Text fontSize="13px">{captionLabel}</Text>
      {props.leftElement || props.rightElement ? (
        <InputGroup>
          {props.leftElement && (
            <InputLeftElement children={props.leftElement} />
          )}
          <Input ref={ref} {...props} />
          {props.rightElement && (
            <InputRightElement children={props.rightElement} />
          )}
        </InputGroup>
      ) : (
        <Input ref={ref} {...props} />
      )}
    </Stack>
  ) : props.leftElement || props.rightElement ? (
    <InputGroup>
      {props.leftElement && <InputLeftElement children={props.leftElement} />}
      <Input ref={ref} {...props} />
      {props.rightElement && (
        <InputRightElement children={props.rightElement} />
      )}
    </InputGroup>
  ) : (
    <Input ref={ref} {...props} />
  ),
);

export default _Input;
