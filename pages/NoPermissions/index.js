import {Container, Text, Flex} from '@chakra-ui/react';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {HomeLayout} from '../../layouts';

const NoPermissions = withAuthenticationRequired(() => (
  <Container maxW="container.xl" mt={30}>
    <Flex h={100} align="center" justify="center">
      <Text fontSize="16px" color="black">
        No tienes permisos para acceder a esta sección
      </Text>
    </Flex>
  </Container>
));

NoPermissions.Layout = HomeLayout;
export default NoPermissions;
