import {useCallback} from 'react';
import {useRouter} from 'next/router';
import {Flex, HStack, Text, useBoolean} from '@chakra-ui/react';
import {getActiveRoute} from './util';

const Row = ({item, option, onClick}) => {
  const router = useRouter();
  const [isHovered, setHovered] = useBoolean(false);
  const activeRoute = getActiveRoute(router, option);
  const handleOnClick = useCallback(
    (i) => {
      onClick(i);
    },
    [onClick],
  );
  return (
    <HStack
      onClick={() => handleOnClick(item)}
      borderRadius={8}
      mt={4}
      mb={4}
      ml={1}
      mr={1}
      p={2}
      bg={activeRoute ? 'white' : 'inherit'}
      boxShadow={(isHovered || activeRoute) && 'md'}
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
      _hover={{
        bg: 'white',
        cursor: 'pointer',
        '& p': {color: 'black'},
      }}>
      <Flex
        height="30px"
        width="30px"
        borderRadius="full"
        justifyContent="center"
        alignItems="center"
        bg={isHovered || activeRoute ? 'green.100' : 'black'}>
        <item.icon color={isHovered || activeRoute ? 'black' : 'green.100'} />
      </Flex>
      <Text color={activeRoute ? 'black' : 'white'} fontWeight="bold">
        {item.text}
      </Text>
    </HStack>
  );
};

export default Row;
