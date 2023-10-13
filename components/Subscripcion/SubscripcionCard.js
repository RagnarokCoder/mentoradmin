import {useCallback} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {Stack, Box, Image, Text} from '@chakra-ui/react';
import Button from '../Button';

const ItemTypes = {
  SUBSCRIPTION_CARD: 'SubscripcionCard',
};

const SubscripcionCard = ({
  item,
  index,
  onClick,
  onGiveSubscription,
  isAdmin,
  OnItemDragging,
  OnItemOver,
}) => {
  const handleOnClick = useCallback(() => onClick(item), [item, onClick]);
  const handleOnClickGiveSubscription = useCallback(
    () => onGiveSubscription(item),
    [item, onGiveSubscription],
  );
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.SUBSCRIPTION_CARD,
    end: () => OnItemDragging(index),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{isOver}, drop] = useDrop(
    () => ({
      accept: ItemTypes.SUBSCRIPTION_CARD,
      drop: () => OnItemOver(index),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );
  return (
    <Box ref={isAdmin ? drop : undefined} bg={isOver ? 'gray.100' : 'inherit'}>
      <Stack ref={isAdmin ? drag : undefined} opacity={isDragging ? 0.5 : 1}>
        <Image
          h="192px"
          objectFit="cover"
          borderRadius="22px"
          src={`${item.pictureUrl}?${Math.random() * index}`}
          alt="Photo"
        />
        <Text size="10px" color="gray.700">
          {item.sportName}
        </Text>
        <Text size="18px" color="black">
          {item.name}
        </Text>
        <Text h={10} size="12px" color="gray.700">
          {item.subheading}
        </Text>
        {isAdmin && (
          <Button onClick={handleOnClickGiveSubscription} variant="outline">
            Regalar suscripción
          </Button>
        )}
        <Button onClick={handleOnClick} variant="outline">
          {isAdmin ? 'Ver suscripción' : 'Crear pick'}
        </Button>
      </Stack>
    </Box>
  );
};

export default SubscripcionCard;
