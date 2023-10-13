import {useCallback} from 'react';
import {Container, Stack, Text} from '@chakra-ui/react';
import Button from '../Button';

const Claims = ({items, onPressResolve}) => {
  const handleOnClick = useCallback((i) => onPressResolve(i), [onPressResolve]);
  return (
    <Container maxW="full">
      <Stack>
        {items?.data?.map((i) => (
          <Stack
            key={i.id}
            direction="row"
            justify="space-between"
            align="center"
            h={12}>
            <Stack spacing={0}>
              <Text fontSize={14} fontWeight="bold">
                {i.description}
              </Text>
              {i.resolution && <Text fontSize={12}>{i.resolution}</Text>}
            </Stack>
            {i.status === 'Waiting' && (
              <Button onClick={() => handleOnClick(i)}>Resolver</Button>
            )}
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};

export default Claims;
