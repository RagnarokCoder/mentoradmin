import {useCallback, useMemo} from 'react';
import {Flex, Box, Image, useDisclosure} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useAuth0} from '@auth0/auth0-react';
import {useDispatch} from 'react-redux';
import ModalConfirmation from '../../components/Modals/ModalConfirmation';
import Button from '../../components/Button';
import {menuItems} from '../../layouts/HomeLayout/menuItems';
import Logo from '../../assets/Img/logo.svg';
import Row from './Row';
import {logOut} from '../../state/actions/session';

const Navbar = ({role}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {logout} = useAuth0();
  const {isOpen, onClose, onOpen} = useDisclosure();
  const handleOnClick = useCallback(
    (i) => {
      i.path && router.push(i.path);
    },
    [router],
  );
  const Menu = useMemo(
    () => menuItems.body.filter((x) => x.roles.find((r) => r === "superadmin")),
    [role],
  );
  return (
    <Flex w="210px">
      <ModalConfirmation
        title="Cerrar sesión"
        info={'Esta seguro que desea cerrar sesión?'}
        buttons={[
          <Button
            onClick={() => {
              onClose();
              logout();
              dispatch(logOut());
            }}>
            Aceptar
          </Button>,
          <Button onClick={onClose}>Cancelar</Button>,
        ]}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex
        h="100%"
        w="220px"
        direction="column"
        zIndex="tooltip"
        bg="black"
        pos="fixed"
        overflow="scroll"
        top={0}
        left={0}
        bottom={0}>
        <Box mb="140px" style={{alignItems:"center", }}>
        <Box  style={{alignItems:"center", display:"flex", width: "220px"}}>
          <Image m={10} src={Logo} alt="Logo" style={{alignItems: "center", width:"50%" }} />
          </Box>
          {Menu.map((i) => (
            <Row key={i.text} item={i} option={i} onClick={handleOnClick} />
          ))}
          <Row item={menuItems.logout} onClick={onOpen} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
