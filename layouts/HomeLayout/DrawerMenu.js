import {useCallback, useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Image,
  Flex,
  Stack,
} from '@chakra-ui/react';
import {useAuth0} from '@auth0/auth0-react';
import {menuItems} from './menuItems';
import Logo from '../../assets/Img/logo.svg';
import ArrowRight from '../../assets/Icons/ArrowRight';
import {logOut} from '../../state/actions/session';

const DrawerMenu = ({isOpen, onClose, role}) => {
  const dispatch = useDispatch();
  const {logout} = useAuth0();
  const router = useRouter();
  const handleOnClick = useCallback(
    (i) => {
      router.push(i.path);
    },
    [router],
  );
  useEffect(() => {
    router.events.on('routeChangeStart', onClose);
    return () => router.events.off('routeChangeStart', onClose);
  }, [router, onClose]);
  const Menu = useMemo(
    () => menuItems.body.filter((x) => x.roles.find((r) => r === role)),
    [role],
  );
  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement="left" size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Image src={Logo} alt="Logo" />
        </DrawerHeader>
        <DrawerBody mt={10}>
          {Menu.map((item) => (
            <Stack
              onClick={() => handleOnClick(item)}
              h={12}
              key={item.text}
              flex={1}
              direction="row"
              justify="space-between">
              <Flex flex={1}>
                <Text>{item.text}</Text>
              </Flex>
              <ArrowRight color="black" />
            </Stack>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Stack
            onClick={() => {
              logout();
              dispatch(logOut());
            }}
            h={12}
            flex={1}
            direction="row"
            justify="space-between">
            <Flex flex={1}>
              <Text>{menuItems.logout.text}</Text>
            </Flex>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
