import {Text, Stack, Image} from '@chakra-ui/react';

const SubscriptionAdded = ({
  startDate,
  endDate,
  preSaleDate,
  sportName,
  assignedUser,
  pictureUrl,
}) => (
  <Stack>
    <Stack direction="row" justify="space-between" alignItems="center">
      <Text>Fecha de inicio</Text>
      <Text>{startDate.split('T')[0]}</Text>
    </Stack>
    <Stack direction="row" justify="space-between" alignItems="center">
      <Text>Fecha de fin</Text>
      <Text>{endDate.split('T')[0]}</Text>
    </Stack>
    {preSaleDate && (
      <Stack direction="row" justify="space-between" alignItems="center">
        <Text>Fecha de preventa</Text>
        <Text>{preSaleDate.split('T')[0]}</Text>
      </Stack>
    )}
    <Stack direction="row" justify="space-between" alignItems="center">
      <Text>Deporte</Text>
      <Text>{sportName}</Text>
    </Stack>
    {assignedUser && (
      <Stack direction="row" justify="space-between" alignItems="center">
        <Text>Analista a cargo</Text>
        <Text>{`${assignedUser.firstName} ${assignedUser.lastName}`}</Text>
      </Stack>
    )}
    <Stack direction="row" justify="space-between" alignItems="center">
      <Text>Image</Text>
      <Image
        h="80px"
        objectFit="cover"
        borderRadius="22px"
        src={
          pictureUrl.substring(0, 1) === 'h'
            ? `${pictureUrl}?${Math.random()}`
            : pictureUrl
        }
        alt="Photo"
      />
    </Stack>
  </Stack>
);

export default SubscriptionAdded;
