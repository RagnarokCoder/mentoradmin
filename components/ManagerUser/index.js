import {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Stack, Flex, Text, Divider, useDisclosure} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ModalConfirmation from '../Modals/ModalConfirmation';
import ModalAddUser from '../Modals/ModalAddUser';
import Loading from '../Loading';
import Pagination from '../Pagination';
import Input from '../Input';
import Button from '../Button';
import useWindowsDimension from '../../hooks/useWindowsDimension';
import LensGlass from '../../assets/Icons/LensGlass';
import {
  fetchUsers,
  deleteUser,
  changePage,
  changeSize,
} from '../../state/actions/users';
import {
  createUser,
  setCreateUserStatus,
  fetch,
} from '../../state/actions/admin';
import {
  selectUsers,
  selectUsersStatus,
  selectPage,
  selectSize,
} from '../../state/selectors/users';
import {
  selectStatus,
  selectCreateUserSuccess,
} from '../../state/selectors/admin';
import {debounce} from '../../utils/debounce';
import ManagerUserRow from './ManagerUserRow';
import {roles} from '../../utils/constants';

const ManagerUser = ({
  role,
  status,
  statusAdmin,
  users,
  page,
  size,
  createUserSuccess,
  onFetchRoles,
  onFetchUsers,
  onDeleteUser,
  onCreateUser,
  onChangePage,
  onChangeSize,
  onSetCreateUserStatus,
}) => {
  const modalConfirm = useDisclosure();
  const modalAddUser = useDisclosure();
  const {height} = useWindowsDimension();
  const [searchValue, setSearchValue] = useState('');
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [buttons, setButtons] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (createUserSuccess !== null) {
      if (createUserSuccess) {
        modalAddUser.onClose();
        setError();
      } else {
        setError(statusAdmin.errorMessage);
      }
      onSetCreateUserStatus();
    }
  }, [createUserSuccess, onSetCreateUserStatus, modalAddUser, statusAdmin]);

  useEffect(() => {
    onChangePage(1);
    onChangeSize(50);
  }, [onChangePage, onChangeSize]);

  useEffect(() => {
    onFetchRoles();
  }, [onFetchRoles]);

  useEffect(() => {
    if (searchValue.length > 0) {
      debounce(onFetchUsers({name: searchValue, role}), 500);
    } else {
      onFetchUsers({
        deleted: false,
        role,
        pageSize: size,
        pageNumber: page,
      });
    }
  }, [onFetchUsers, page, size, searchValue, role]);

  const handleRemove = (user) => {
    modalConfirm.onClose();
    onDeleteUser(user.id, role);
  };

  const handleOnVerifiedDelete = (user) => {
    setTitle('Remover usuario');
    setInfo(`Desea remover el usuario ${user.username}?`);
    setButtons([
      <Button onClick={() => handleRemove(user)}>Remover</Button>,
      <Button onClick={modalConfirm.onClose}>Cancelar</Button>,
    ]);
    modalConfirm.onOpen();
  };

  const handleOnAddUser = (values) => {
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      username: values.username,
    };
    onCreateUser(body, role);
  };

  return (
    <Fragment>
      {status.isFetching && <Loading />}
      <ModalConfirmation
        title={title}
        info={info}
        buttons={buttons}
        isOpen={modalConfirm.isOpen}
        onClose={modalConfirm.onClose}
      />
      <ModalAddUser
        title={
          role === roles.analist
            ? 'Registrar un nuevo Analista'
            : 'Registrar un nuevo Administrador'
        }
        isOpen={modalAddUser.isOpen}
        onClose={modalAddUser.onClose}
        onSubmit={handleOnAddUser}
        error={error}
        isFetching={statusAdmin.isFetching}
      />
      <Stack
        p={[2, 10]}
        bg="white"
        boxShadow="md"
        borderRadius={16}
        spacing={6}>
        <Text fontSize="18px" color="black" fontWeight="bold">
          {`${
            role === roles.analist ? 'Analistas' : 'Administradores'
          } King Parlay`}
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
            w="90%">
            Usuario
          </Text>
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            fontSize="10px"
            textAlign="center"
            textColor="gray.700"
            w="10%">
            Borrar
          </Text>
        </Stack>
        <Stack h={height - 600} overflow="scroll">
          {users?.data.map((item) => (
            <Fragment key={item.id}>
              <ManagerUserRow user={item} onDelete={handleOnVerifiedDelete} />
              <Divider />
            </Fragment>
          ))}
        </Stack>
        <Pagination
          {...users}
          onChangePage={(pageP) => onChangePage(pageP)}
          onSetPageSize={(pageS) => onChangeSize(pageS)}
        />
        <Flex justifyContent="flex-end">
          <Button onClick={modalAddUser.onOpen}>{`${
            role === roles.analist
              ? 'Agregar analista'
              : 'Agregar Administrador'
          }`}</Button>
        </Flex>
      </Stack>
    </Fragment>
  );
};

ManagerUser.propTypes = {
  role: PropTypes.oneOf([roles.admin, roles.analist]),
};

export default connect(
  (state) => ({
    status: selectUsersStatus(state),
    statusAdmin: selectStatus(state),
    users: selectUsers(state),
    page: selectPage(state),
    size: selectSize(state),
    createUserSuccess: selectCreateUserSuccess(state),
  }),
  {
    onFetchRoles: fetch,
    onFetchUsers: fetchUsers,
    onDeleteUser: deleteUser,
    onCreateUser: createUser,
    onChangePage: changePage,
    onChangeSize: changeSize,
    onSetCreateUserStatus: setCreateUserStatus,
  },
)(ManagerUser);
