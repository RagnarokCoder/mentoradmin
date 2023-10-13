import {useEffect, useState} from 'react';
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Stack,
  Flex,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import AddCompetition from '../../components/Competitions/AddCompetition';
import ModalConfirmation from '../../components/Modals/ModalConfirmation';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {
  initialize,
  fetchById,
  fetch,
  clearCompetition,
  remove,
  update,
  create,
  changePage,
  changeSize,
} from '../../state/actions/competition';
import {
  selectCompetitionStatus,
  selectCompetitions,
  selectCompetition,
  selectPage,
  selectSize,
} from '../../state/selectors/competition';
import {selectSports} from '../../state/selectors/sport';
import {selectTeams} from '../../state/selectors/team';
import {selectIsPermissions} from '../../state/selectors/users';
import {HomeLayout} from '../../layouts';
import useWindowsDimension from '../../hooks/useWindowsDimension';

const Competitions = withAuthenticationRequired(
  ({
    permissions,
    status,
    competitions,
    competition,
    sports,
    teams,
    page,
    size,
    onMount,
    onFetch,
    handleClearCompetition,
    handleOnFetchId,
    handleOnRemove,
    handleOnUpdate,
    handleOnCreate,
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
      onMount();
    }, [onMount]);
    useEffect(() => {
      onFetch({pageSize: size, pageNumber: page});
    }, [onFetch, size, page]);
    useEffect(() => {
      if (competition) {
        modalAdd.onOpen();
      }
    }, [competition, modalAdd]);
    const handleDelete = (item) => {
      setItemSelected(item);
      modalDelete.onOpen();
    };

    const handleEdit = (item) => {
      setIsEdit(true);
      handleOnFetchId(item.id);
      setItemSelected(null);
    };

    const handleCreate = () => {
      setItemSelected(null);
      setIsEdit(false);
      modalAdd.onOpen();
    };

    const handleOnSubmit = (values) => {
      isEdit ? handleOnUpdate(competition.id, values) : handleOnCreate(values);
      handleClearCompetition();
      modalAdd.onClose();
    };

    return (
      permissions && (
        <Container maxW="full">
          {status.isFetching && <Loading />}
          <ModalConfirmation
            title="Confirma borrado"
            info={`Esta seguro que desea eliminar la competición ${itemSelected?.name}?`}
            buttons={[
              <Button
                onClick={() => {
                  modalDelete.onClose();
                  handleOnRemove(itemSelected.id);
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
          <AddCompetition
            competition={isEdit ? competition : undefined}
            onSubmit={handleOnSubmit}
            isOpen={modalAdd.isOpen}
            isEdit={isEdit}
            onClose={() => {
              modalAdd.onClose();
              handleClearCompetition();
            }}
            sports={sports}
            teams={teams}
          />
          <Stack h={!isMobile && height - 200} overflow="scroll">
            <Table overflow="scroll" variant="striped">
              <TableCaption>Competitions</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Tier</Th>
                  <Th>Sport</Th>
                  <Th>Edit AND Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {competitions?.data.map((i, index) => (
                  <Tr key={i.id}>
                    <Td>{i.name}</Td>
                    <Td>{i.tierName}</Td>
                    <Td>{i.sportName}</Td>
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
            {...competitions}
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

Competitions.Layout = HomeLayout;

export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
    competitions: selectCompetitions(state),
    competition: selectCompetition(state),
    sports: selectSports(state),
    teams: selectTeams(state),
    status: selectCompetitionStatus(state),
    page: selectPage(state),
    size: selectSize(state),
  }),
  {
    onMount: initialize,
    onFetch: fetch,
    handleOnFetchId: fetchById,
    handleOnRemove: remove,
    handleOnUpdate: update,
    handleOnCreate: create,
    handleClearCompetition: clearCompetition,
    onChangePage: changePage,
    onChangeSize: changeSize,
  },
)(Competitions);
