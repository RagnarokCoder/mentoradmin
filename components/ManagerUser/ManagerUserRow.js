import {useCallback} from 'react';
import {Stack, Text, Image} from '@chakra-ui/react';
import TrashOutline from '../../assets/Icons/TrashOutline';
import Button from '../../components/Button';

const ManagerUserRow = ({user, onDelete}) => {
  const handleOnClickDelete = useCallback(
    () => onDelete(user),
    [onDelete, user],
  );
  return (
    <Stack direction="row" align="center">
      <Stack
        direction={['column', 'row']}
        align={['flex-start', 'center']}
        w="90%">
        {user.pictureUrl && (
          <Image
            alt="Photo profile"
            boxSize="40px"
            borderRadius="12px"
            objectFit="cover"
            src={user.pictureUrl}
          />
        )}
        <Stack spacing="2px">
          <Text fontWeight="bold" fontSize={[12, 14]} color="green.100">
            {user.username && `@${user.username}`}
          </Text>
          <Text fontWeight="bold" fontSize={[12, 14]} color="black">
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <Text fontSize={[8, 12]} color="gray.900">
            {user.email}
          </Text>
        </Stack>
      </Stack>
      <Stack align="center" w="10%">
        {onDelete && (
          <Button
            background={undefined}
            variant="link"
            onClick={handleOnClickDelete}>
            <TrashOutline color="black" height={6} width={6} />
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ManagerUserRow;
