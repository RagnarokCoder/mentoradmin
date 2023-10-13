import {useCallback} from 'react';
import {Stack, Text, Image} from '@chakra-ui/react';
import CheckCircle from '../../assets/Icons/CheckCircle';
import TrashOutline from '../../assets/Icons/TrashOutline';
import Certified from '../../assets/Icons/Certified';
import Button from '../../components/Button';

const UserRow = ({user, isDeleted, onDelete, onVerified, onDesBanned}) => {
  const handleOnClickDelete = useCallback(
    () => onDelete(user),
    [onDelete, user],
  );
  const handleOnClickVerified = useCallback(
    () => onVerified(user),
    [onVerified, user],
  );
  const handleOnDesBanned = useCallback(
    () => onDesBanned(user),
    [onDesBanned, user],
  );
  return (
    <Stack direction="row" align="center">
      <Stack
        direction={['column', 'row']}
        align={['flex-start', 'center']}
        w="40%">
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
      <Stack align="center" w="15%">
        <Text fontWeight="bold" fontSize={[12, 14]} color="black">
          {user.role}
        </Text>
      </Stack>
      <Stack align="center" w="15%">
        {!isDeleted && (
          <CheckCircle
            _hover={{
              cursor: 'pointer',
            }}
            onClick={handleOnDesBanned}
            color={user.banned ? 'green.100' : 'gray.700'}
            height={6}
            width={6}
          />
        )}
      </Stack>
      <Stack align="center" w="15%">
        {onVerified && (
          <Certified
            _hover={{
              cursor: 'pointer',
            }}
            onClick={handleOnClickVerified}
            color={user.verified ? 'green.100' : 'gray.700'}
            height={6}
            width={6}
          />
        )}
      </Stack>
      <Stack align="center" w="15%">
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

export default UserRow;
