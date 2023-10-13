import {useEffect, useCallback} from 'react';
import {Flex, Stack, Text, Image} from '@chakra-ui/react';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';
import {setToken, setUserId} from '../../state/actions/session';
import Carrousel01 from '../../assets/Img/foto1.svg';
import Carrousel02 from '../../assets/Img/foto2.svg';
import Carrousel03 from '../../assets/Img/foto3.svg';
import Carrousel04 from '../../assets/Img/moises_alex.svg';
import MentorbetsLogo from '../../assets/Img/logof.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

const Login = ({onSetToken, onSetUserId}) => {
  const {loginWithPopup, getAccessTokenSilently, isAuthenticated, user} =
    useAuth0();

  const getAccessToken = useCallback(async () => {
    const token = await getAccessTokenSilently({
      audience: process.env.API_ENDPOINT,
      scope: 'openid profile email',
    });
    onSetToken(token);
    onSetUserId(user.sub);
  }, [getAccessTokenSilently, onSetToken, user, onSetUserId]);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken();
    }
  }, [getAccessToken, isAuthenticated]);

  const handleLoginWithRedirect = async () => {
    await loginWithPopup();
  };

  return (
    <Stack
      position="fixed"
      top={0}
      bottom={0}
      left={0}
      right={0}
      bg="black.300"
      spacing="0px"
      display="flex"
      direction={['column', 'row']}>
      <Flex flex={0.5} position="relative">
        <Image
          position="absolute"
          boxSize={40}
          marginLeft="auto"
          marginRight="auto"
          left={0}
          right={0}
          top="40%"
          textAlign="center"
          zIndex="docked"
          objectFit="contain"
          src={MentorbetsLogo}
        />
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          swipeable={true}
          showThumbs={false}
          showArrows={false}
          showStatus={false}>
          <Image
            alt="Photo Carrousel"
            objectFit="cover"
            fit="cover"
            src={Carrousel01}
            h="100%"
          />
          <Image
            alt="Photo Carrousel"
            objectFit="cover"
            fit="cover"
            src={Carrousel02}
            h="100%"
          />
          <Image
            alt="Photo Carrousel"
            objectFit="cover"
            fit="cover"
            src={Carrousel03}
            h="100%"
          />
          <Image
            alt="Photo Carrousel"
            objectFit="cover"
            fit="cover"
            src={Carrousel04}
            h="100%"
          />
        </Carousel>
      </Flex>
      <Stack
        flex={0.5}
        alignItems="center"
        justifyContent="center"
        bg="black.300">
        <Text color="white" size="20px" fontWeight="bold">
          Bienvenido a Kings Parlay
        </Text>
        <Text color="gray.400" size="17px">
          La mejor plataforma de apuestas deportivas
        </Text>
        <Button onClick={handleLoginWithRedirect} size="lg">
          Ingresar
        </Button>
      </Stack>
    </Stack>
  );
};

export default connect((state) => null, {
  onSetToken: setToken,
  onSetUserId: setUserId,
})(Login);
