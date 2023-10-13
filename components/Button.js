import {forwardRef} from 'react';
import {Button} from '@chakra-ui/react';

const _Button = forwardRef(({...props}, ref) => (
  <Button ref={ref} color="white" background="green.100" {...props} />
));

export default _Button;
