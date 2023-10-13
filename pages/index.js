import {useEffect} from 'react';
import {Container} from '@chakra-ui/react';
import {useAuth0} from '@auth0/auth0-react';
import {MainLayout} from '../layouts';
import {useRouter} from 'next/router';

const InitPage = () => {
  const router = useRouter();
  const {isAuthenticated} = useAuth0();
  useEffect(() => {
      isAuthenticated ?
      router.push('./Home'):router.push('./Login')
    
  }, [isAuthenticated, router]);
  return <Container maxW="container.xl" />;
};

InitPage.Layout = MainLayout;

export default InitPage;
