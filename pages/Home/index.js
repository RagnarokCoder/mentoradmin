import {Container} from '@chakra-ui/react';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {HomeLayout} from '../../layouts';

const Home = withAuthenticationRequired(() => (
  <Container maxW="container.xl" />
));

Home.Layout = HomeLayout;

export default Home;
