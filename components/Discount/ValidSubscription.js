import {useCallback} from 'react';
import {Stack, Text} from '@chakra-ui/react';
import Button from '../Button';
import TrashOutline from '../../assets/Icons/TrashOutline';

const ValidSubscription = ({subscription, onRemove}) => {
  const handleOnClickTrash = useCallback(
    () => onRemove(subscription),
    [onRemove, subscription],
  );
  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      py={2}
      borderRadius="md"
      bg="gray.700"
      px={4}>
      <Text>{subscription?.name}</Text>
      <Button
        background={undefined}
        variant="link"
        onClick={handleOnClickTrash}>
        <TrashOutline color="black" />
      </Button>
    </Stack>
  );
};

export default ValidSubscription;
