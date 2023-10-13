import {useState, useEffect, useCallback} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Input from '../Input';
import Loading from '../Loading';
import LensGlass from '../../assets/Icons/LensGlass';
import {fetchUsers} from '../../state/actions/users';
import {selectUsers, selectUsersStatus} from '../../state/selectors/users';
import {debounce} from '../../utils/debounce';
import {roles} from '../../utils/constants';

const ModalSearchUser = ({
  users,
  role,
  status,
  isOpen,
  onClose,
  onFetchUsers,
  onSelectUser,
}) => {
  const [searchValue, setSearchValue] = useState();
  useEffect(() => {
    debounce(onFetchUsers({name: searchValue, role}), 500);
  }, [onFetchUsers, searchValue, role]);
  const handleOnSelectUser = useCallback(
    (user) => onSelectUser(user),
    [onSelectUser],
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {status.isFetching && <Loading />}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack mt={3}>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              leftElement={<LensGlass color="black" />}
              placeholder="Buscar usuario"
              type="text"
            />
            <Stack overflow="scroll" h={400}>
              {users?.data.map((user) => (
                <Text
                  onClick={() => handleOnSelectUser(user)}
                  _hover={{cursor: 'pointer'}}
                  key={user.id}>{`${user.firstName} ${user.lastName}`}</Text>
              ))}
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ModalSearchUser.propTypes = {
  role: PropTypes.oneOf([roles.admin, roles.user, roles.analist]),
};

export default connect(
  (state) => ({
    users: selectUsers(state),
    status: selectUsersStatus(state),
  }),
  {
    onFetchUsers: fetchUsers,
  },
)(ModalSearchUser);
