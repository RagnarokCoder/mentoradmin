import {Fragment, useEffect, useState} from 'react';
import {Container, Stack, Text, Divider, useDisclosure} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {HomeLayout} from '../../layouts';
import Input from '../../components/Input';
import ModalConfirmation from '../../components/Modals/ModalConfirmation';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import UserRow from '../../components/Users/UserRow';
import {
  fetchUsers,
  fetchUsersDeleted,
  deleteUser,
  bannedUser,
  verifiedUser,
  changePage,
  changePageDeleted,
  changeSize,
  changeSizeDeleted,
} from '../../state/actions/users';
import {
  selectUsers,
  selectUsersDeleted,
  selectUsersStatus,
  selectIsPermissions,
  selectPage,
  selectPageDelete,
  selectSize,
  selectSizeDelete,
} from '../../state/selectors/users';
import LensGlass from '../../assets/Icons/LensGlass';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {debounce} from '../../utils/debounce';

const Users = withAuthenticationRequired(
  ({
    permissions,
    statusUser,
    usersNoDeleted,
    usersDeleted,
    page,
    size,
    pageDelete,
    sizeDelete,
    onFetchUsers,
    onFetchUsersDeleted,
    onDeleteUser,
    onBannedUser,
    onVerifiedUser,
    onChangePage,
    onChangePageDeleted,
    onChangeSize,
    onChangeSizeDeleted,
  }) => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [searchValue, setSearchValue] = useState('');
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
      onChangePage(1);
      onChangeSize(10);
    }, [onChangePage, onChangeSize]);

    useEffect(() => {
      if (searchValue.length > 0) {
        debounce(onFetchUsers({name: searchValue}), 500);
        debounce(onFetchUsersDeleted({deleted: true, name: searchValue}), 500);
      } else {
        onFetchUsers({
          deleted: false,
          pageSize: size,
          pageNumber: page,
        });
        onFetchUsersDeleted({
          deleted: true,
          pageSize: sizeDelete,
          pageNumber: pageDelete,
        });
      }
    }, [
      onFetchUsers,
      onFetchUsersDeleted,
      page,
      pageDelete,
      searchValue,
      size,
      sizeDelete,
    ]);

    const handleVerifiedProcess = (user) => {
      onClose();
      onVerifiedUser(user.id, {verified: !user.verified});
    };

    const handleRemoveProcess = (user) => {
      onClose();
      onDeleteUser(user.id);
    };

    const handleOnVerifiedConfirmation = (user) => {
      setTitle('Verificación de usuario');
      if (user.verified) {
        setInfo(`Desea remover la verificación del usuario ${user.username}?`);
        setButtons([
          <Button onClick={() => handleVerifiedProcess(user)}>Remover</Button>,
          <Button onClick={onClose}>Cancelar</Button>,
        ]);
      } else {
        setInfo(`Desea verificar el usuario ${user.username}?`);
        setButtons([
          <Button onClick={() => handleVerifiedProcess(user)}>Agregar</Button>,
          <Button onClick={onClose}>Cancelar</Button>,
        ]);
      }
      onOpen();
    };

    const handleOnVerifiedDelete = (user) => {
      setTitle('Remover usuario');
      setInfo(`Desea remover el usuario ${user.username}?`);
      setButtons([
        <Button onClick={() => handleRemoveProcess(user)}>Remover</Button>,
        <Button onClick={onClose}>Cancelar</Button>,
      ]);
      onOpen();
    };

    const handleOnDesBanned = (user) => {
      setTitle('Desbannear usuario');
      setInfo(
        `${user.banned ? 'Desbannear' : 'Bannear'} el usuario ${
          user.username
        }?`,
      );
      setButtons([
        <Button
          onClick={() => {
            onClose();
            onBannedUser(user.id, {banned: !user.banned});
          }}>
          Aceptar
        </Button>,
        <Button onClick={onClose}>Cancelar</Button>,
      ]);
      onOpen();
    };

    return (
      permissions && (
        <Container maxW="full">
          {statusUser.isFetching && <Loading />}
          <ModalConfirmation
            title={title}
            info={info}
            buttons={buttons}
            isOpen={isOpen}
            onClose={onClose}
          />
          <Stack
            p={[2, 10]}
            bg="white"
            boxShadow="md"
            borderRadius={16}
            spacing={6}>
            <Text fontSize="18px" color="black" fontWeight="bold">
              Usuarios Kings Parlay
            </Text>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              leftElement={<LensGlass color="black" />}
              placeholder="Buscar"
              type="text"
            />
            <Stack
              direction="row"
              align="center"
              h="50px"
              borderBottomWidth="1px"
              borderBottomColor="gray.500">
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="10px"
                textColor="gray.700"
                w="40%">
                Usuario
              </Text>
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="10px"
                textAlign="center"
                textColor="gray.700"
                w="15%">
                Rol
              </Text>
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="10px"
                textAlign="center"
                textColor="gray.700"
                w="15%">
                Banned
              </Text>
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="10px"
                textAlign="center"
                textColor="gray.700"
                w="15%">
                Estado
              </Text>
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="10px"
                textAlign="center"
                textColor="gray.700"
                w="15%">
                Borrar
              </Text>
            </Stack>
            <Stack>
              {usersNoDeleted?.data.map((item) => (
                <Fragment key={item.id}>
                  <UserRow
                    user={item}
                    onDesBanned={handleOnDesBanned}
                    onVerified={handleOnVerifiedConfirmation}
                    onDelete={handleOnVerifiedDelete}
                  />
                  <Divider />
                </Fragment>
              ))}
            </Stack>
            <Pagination
              {...usersNoDeleted}
              onChangePage={(pageP) => onChangePage(pageP)}
              onSetPageSize={(pageS) => onChangeSize(pageS)}
            />
          </Stack>
          <Stack
            p={[2, 10]}
            mt={10}
            bg="white"
            boxShadow="md"
            borderRadius={16}
            spacing={6}>
            <Text fontSize="18px" color="black" fontWeight="bold">
              Usuarios eliminados
            </Text>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="10px"
              textColor="gray.700"
              w="40%">
              Usuario
            </Text>
            {usersDeleted?.data.map((item) => (
              <Fragment key={item.id}>
                <UserRow user={item} isDeleted />
                <Divider />
              </Fragment>
            ))}
            <Pagination
              {...usersDeleted}
              onChangePage={(pageP) => onChangePageDeleted(pageP)}
              onSetPageSize={(pageS) => onChangeSizeDeleted(pageS)}
            />
          </Stack>
        </Container>
      )
    );
  },
);

Users.Layout = HomeLayout;

export default connect(
  (state) => ({
    statusUser: selectUsersStatus(state),
    permissions: selectIsPermissions(state),
    usersNoDeleted: selectUsers(state),
    usersDeleted: selectUsersDeleted(state),
    page: selectPage(state),
    pageDelete: selectPageDelete(state),
    size: selectSize(state),
    sizeDelete: selectSizeDelete(state),
  }),
  {
    onFetchUsers: fetchUsers,
    onFetchUsersDeleted: fetchUsersDeleted,
    onDeleteUser: deleteUser,
    onBannedUser: bannedUser,
    onVerifiedUser: verifiedUser,
    onChangePage: changePage,
    onChangePageDeleted: changePageDeleted,
    onChangeSize: changeSize,
    onChangeSizeDeleted: changeSizeDeleted,
  },
)(Users);
