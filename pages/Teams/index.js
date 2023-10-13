import {useEffect, useState} from 'react';
import {
  Container,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Stack,
  useDisclosure,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import AddTeam from '../../components/Teams/AddTeam';
import Pagination from '../../components/Pagination';
import ModalConfirmation from '../../components/Modals/ModalConfirmation';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {
  fetch,
  create,
  update,
  deleted,
  changePage,
  changeSize,
} from '../../state/actions/team';
import {
  selectTeams,
  selectTeamStatus,
  selectPage,
  selectSize,
} from '../../state/selectors/team';
import {selectIsPermissions} from '../../state/selectors/users';
import {HomeLayout} from '../../layouts';
import useWindowsDimension from '../../hooks/useWindowsDimension';

const Team = withAuthenticationRequired(
  ({
    permissions,
    teams,
    status,
    onMount,
    page,
    size,
    handleOnCreate,
    handleOnUpdate,
    handleOnDelete,
    onChangePage,
    onChangeSize,
  }) => {
    const [itemSelected, setItemSelected] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const modalAdd = useDisclosure();
    const modalDelete = useDisclosure();
    const {height} = useWindowsDimension();
    const isMobile = useBreakpointValue({base: true, xl: false});
    useEffect(() => {
      onMount({pageSize: size, pageNumber: page});
    }, [onMount, page, size]);

    const handleDelete = (item) => {
      setItemSelected(item);
      modalDelete.onOpen();
    };

    const handleEdit = (item) => {
      setIsEdit(true);
      setItemSelected(item);
      modalAdd.onOpen();
    };

    const handleCreate = () => {
      setItemSelected(null);
      setIsEdit(false);
      modalAdd.onOpen();
    };

    const handleOnSubmit = (values) => {
      modalAdd.onClose();
      isEdit ? handleOnUpdate(itemSelected.id, values) : handleOnCreate(values);
    };

    return (
      permissions && (
        <Container maxW="full">
          {status.isFetching && <Loading />}
          <ModalConfirmation
            title="Confirma borrado"
            info={`Esta seguro que desea eliminar el equipo ${itemSelected?.name}?`}
            buttons={[
              <Button
                onClick={() => {
                  modalDelete.onClose();
                  handleOnDelete(itemSelected.id);
                  setItemSelected(null);
                }}>
                Aceptar
              </Button>,
              <Button
                onClick={() => {
                  setItemSelected(null);
                  modalDelete.onClose();
                }}>
                Cancelar
              </Button>,
            ]}
            isOpen={modalDelete.isOpen}
            onClose={modalDelete.onClose}
          />
          <AddTeam
            name={itemSelected?.name}
            file={itemSelected?.pictureUrl}
            onSubmit={handleOnSubmit}
            isOpen={modalAdd.isOpen}
            isEdit={isEdit}
            onClose={modalAdd.onClose}
          />
          <Stack h={!isMobile && height - 200} overflow="scroll">
            <Table maxW="full" variant="striped">
              <TableCaption>Teams</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Picture</Th>
                  <Th>Edit AND Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {teams?.data.map((i, index) => (
                  <Tr key={i.id}>
                    <Td>{i.name}</Td>
                    <Td>
                      <Image
                        borderRadius="full"
                        boxSize="50px"
                        src={`${i.pictureUrl}?${Math.random() * index}`}
                        alt={i.name}
                      />
                    </Td>
                    <Td>
                      <Stack direction={['column', 'row']} spacing={[2, 2]}>
                        <Button onClick={() => handleEdit(i)}>Edit</Button>
                        <Button onClick={() => handleDelete(i)}>Delete</Button>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Stack>
          <Pagination
            {...teams}
            onChangePage={(pageP) => onChangePage(pageP)}
            onSetPageSize={(pageS) => onChangeSize(pageS)}
          />
          <Flex mt={4} justifyContent="flex-end">
            <Button onClick={handleCreate}>Create</Button>
          </Flex>
        </Container>
      )
    );
  },
);

Team.Layout = HomeLayout;

export default connect(
  (state) => ({
    teams: selectTeams(state),
    status: selectTeamStatus(state),
    permissions: selectIsPermissions(state),
    page: selectPage(state),
    size: selectSize(state),
  }),
  {
    onMount: fetch,
    handleOnCreate: create,
    handleOnUpdate: update,
    handleOnDelete: deleted,
    onChangePage: changePage,
    onChangeSize: changeSize,
  },
)(Team);
