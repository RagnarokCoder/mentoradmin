import {useCallback} from 'react';
import {Stack, Image, Text} from '@chakra-ui/react';
import Button from '../Button';
import TrashOutline from '../../assets/Icons/TrashOutline';

const UserRow = ({user, languageName, countryName, onRemove}) => {
  const handleOnClickTrash = useCallback(
    () => onRemove(user),
    [onRemove, user],
  );
  return (
    <Stack
      direction="row"
      align="center"
      py={2}
      bg="gray.200"
      px={4}
      borderRadius="md">
      {user.pictureUrl && (
        <Image
          boxSize="60px"
          borderRadius="full"
          objectFit="cover"
          alt="User picture"
          src={user.pictureUrl}
        />
      )}
      <Stack spacing={1} flex={1}>
        <Stack direction="row">
          <Text fontWeight="bold">Nombre: </Text>
          <Text>{`${user.firstName} ${user.lastName}`}</Text>
        </Stack>
        {user.username && (
          <Stack direction="row">
            <Text fontWeight="bold">Username: </Text>
            <Text>{user.username}</Text>
          </Stack>
        )}
        <Stack direction="row">
          <Text fontWeight="bold">Idioma: </Text>
          <Text>{languageName}</Text>
        </Stack>
        <Stack direction="row">
          <Text fontWeight="bold">País: </Text>
          <Text>{countryName}</Text>
        </Stack>
      </Stack>
      <Button
        background={undefined}
        variant="link"
        onClick={handleOnClickTrash}>
        <TrashOutline color="black" />
      </Button>
    </Stack>
  );
};

export default UserRow;
