import {Box, Text} from '@chakra-ui/react';
import Plus from '../../assets/Icons/Plus';

const CardAdd = ({title, onClick}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="md"
    borderWidth={1}
    flexDirection="column"
    h="353px"
    w="full"
    onClick={onClick}>
    <Plus color="gray.900" />
    <Text color="gray.900" size={18}>
      {title}
    </Text>
  </Box>
);

export default CardAdd;
