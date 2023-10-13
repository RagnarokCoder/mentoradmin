import {Stack, Text} from '@chakra-ui/react';

const PickRow = ({team1, team2, matchDate, isSelected, onClick}) => (
  <Stack
    onClick={onClick}
    spacing={0}
    mb={4}
    p={4}
    bg={isSelected ? 'green.100' : 'inherit'}
    borderWidth={1}
    borderRadius={8}
    _hover={{
      borderColor: 'green',
      cursor: 'pointer',
    }}>
    <Text fontSize="16px" color="gray.400">{`${team1} VS ${team2}`}</Text>
    <Text fontSize="14px" color="gray.400">
      {`Fecha: ${new Date(matchDate).toISOString().split('T')[0]}`}
    </Text>
    <Text fontSize="14px" color="gray.400">
      {`Hora: ${new Date(matchDate).toTimeString().substring(0, 5)}`}
    </Text>
  </Stack>
);

export default PickRow;
