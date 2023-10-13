import {useEffect} from 'react';
import {
  Text,
  Box,
  useDisclosure,
  Image,
  Stack,
  Flex,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import DrawerMenu from './DrawerMenu';
import Bars from '../../assets/Icons/Bars';
import Navbar from '../../components/Navbar';
import {fetchUser} from '../../state/actions/users';
import {selectUser, selectPictureUrl} from '../../state/selectors/users';

const HomeLayout = ({user, pictureUrl, onMount, children}) => {
  const isMobile = useBreakpointValue({base: true, xl: false});
  const {isOpen, onOpen, onClose} = useDisclosure();
  useEffect(() => {
    onMount();
  }, [onMount]);
  return isMobile ? (
    <Flex bg="gray.600">
      <DrawerMenu isOpen={isOpen} onClose={onClose} role={user?.role} />
      <Stack direction="column" spacing={4} width="100%">
        <Flex height="100px" bg="gray.600" zIndex="overlay">
          <Box pos="fixed" left={0} top={0} right={0} h="100px" bg="gray.600">
            <Flex
              m={4}
              bg="gray.600"
              direction="row"
              justify="space-between"
              alignItems="center">
              <Button background="gray.600" onClick={onOpen}>
                <Bars color="gray.800" />
              </Button>
              <Image
                borderRadius="full"
                boxSize="50px"
                alt="Profile"
                src={pictureUrl}
              />
            </Flex>
          </Box>
        </Flex>
        {children}
      </Stack>
    </Flex>
  ) : (
    <Stack direction="row" flex={1} bg="gray.600">
      <Navbar role={user?.role} />
      <Container maxW="full" maxH="full" bg="gray.600">
        <Flex direction="column">
          <Box
            pos="fixed"
            left="210px"
            top={0}
            zIndex="overlay"
            right={0}
            h="80px"
            bg="gray.600">
            <Stack
              h="80px"
              mx={30}
              justify="space-between"
              alignItems="center"
              direction="row">
              <Text>{`${user?.firstName} ${user?.lastName}`}</Text>
              <Image
                boxSize="40px"
                borderRadius="full"
                alt="Profile"
                src={pictureUrl}
              />
            </Stack>
          </Box>
          <Flex flex={1} mt="85px">
            {children}
          </Flex>
        </Flex>
      </Container>
    </Stack>
  );
};

export default connect(
  (state) => ({
    user: selectUser(state),
    pictureUrl: selectPictureUrl(state),
  }),
  {
    onMount: fetchUser,
  },
)(HomeLayout);
