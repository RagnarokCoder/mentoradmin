import {useEffect, useState, useCallback} from 'react';
import {
  Container,
  Text,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Box,
  TabPanel,
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';
import Loading from '../../components/Loading';
import PickRow from '../../components/PickRow';
import Pagination from '../../components/Pagination';
import NewPickForm from '../../components/Picks/NewPickForm';
import {buildBody} from '../../components/Picks/util';
import LensGlass from '../../assets/Icons/LensGlass';
import useWindowsDimension from '../../hooks/useWindowsDimension';
import useRoles from '../../hooks/useRoles';
import Input from '../../components/Input';
import {selectIsPermissions} from '../../state/selectors/users';
import {selectLanguageLanguages} from '../../state/selectors/language';
import {selectSubscriptions} from '../../state/selectors/subscriptions';
import {selectTeams} from '../../state/selectors/team';
import {selectUser} from '../../state/selectors/users';
import {
  selectPicks,
  selectPicksDraft,
  selectPick,
  selectPicksStatus,
  selectComplete,
  selectPageSizeDraft,
  selectPageNumberDraft,
  selectPageSizeNoDraft,
  selectPageNumberNoDraft,
  selectSubscriptionSelected,
} from '../../state/selectors/picks';
import {selectCompetitions} from '../../state/selectors/competition';
import {fetch} from '../../state/actions/subscriptions';
import {fetchLanguages} from '../../state/actions/language';
import {
  fetch as fetchPicks,
  fetchDraft,
  fetchById,
  update,
  fetchSubscriptionCompetition,
  fetchingSubcriptionCompetition,
  changePage,
  changePageDraft,
  changeSize,
  changeSizeDraft,
  changeSubscription,
} from '../../state/actions/picks';
import {HomeLayout} from '../../layouts';

const Picks = withAuthenticationRequired(
  ({
    permissions,
    user,
    languages,
    subscriptions,
    teams,
    pick,
    picks,
    complete,
    picksDraft,
    competitions,
    statusPick,
    onFetchSubscriptions,
    onFetchLanguages,
    onFetchPicks,
    onFetchPicksDraft,
    onUpdate,
    onFetchSubscriptionCompetition,
    onFetchingSubcriptionCompetition,
    onFetchById,
    pageSizeDraft,
    pageNumberDraft,
    pageSizeNoDraft,
    pageNumberNoDraft,
    onChangePage,
    onChangePageDraft,
    onChangeSize,
    onChangeSizeDraft,
    subscriptionSelected,
    onChangeSubscription,
  }) => {
    const router = useRouter();
    const {height} = useWindowsDimension();
    const isMobile = useBreakpointValue({base: true, xl: false});
    const [searchValue, setSearchValue] = useState('');
    const [currentSelected, setCurrentSelected] = useState();
    const [currentTab, setCurrentTab] = useState(0);
    const [subscriptionId, setSubscriptionId] = useState();
    const [competitionId, setCompetitionId] = useState();
    const [infoAdded, setInfoAdded] = useState([]);
    const [initialValues, setInitialValues] = useState();
    const [pickDraftList, setPickDraftList] = useState([]);
    const [pickList, setPickList] = useState([]);
    const {isAdmin} = useRoles();
    useEffect(() => {
      onFetchSubscriptions({
        PreSaleDateEnd: new Date().toISOString().split('T')[0],
        EndDateBegin: new Date().toISOString().split('T')[0],
        AssignedUserId: !isAdmin ? user?.id : undefined,
      });
    }, [user, onFetchSubscriptions, isAdmin]);
    useEffect(() => {
      onFetchPicksDraft({
        assignedUserId: !isAdmin ? user?.id : undefined,
        pageSize: pageSizeDraft,
        pageNumber: pageNumberDraft,
        subscriptionId: subscriptionSelected,
      });
    }, [
      onFetchPicksDraft,
      pageNumberDraft,
      pageSizeDraft,
      user,
      isAdmin,
      subscriptionSelected,
    ]);
    useEffect(() => {
      onFetchPicks({
        assignedUserId: !isAdmin ? user?.id : undefined,
        pageSize: pageSizeNoDraft,
        pageNumber: pageNumberNoDraft,
        subscriptionId: subscriptionSelected,
      });
    }, [
      onFetchPicks,
      pageNumberNoDraft,
      pageSizeNoDraft,
      user,
      isAdmin,
      subscriptionSelected,
    ]);
    useEffect(() => {
      onFetchLanguages();
    }, [onFetchLanguages]);
    useEffect(() => {
      setCurrentSelected(pickDraftList?.data?.[0]);
    }, [pickDraftList?.data]);
    useEffect(() => {
      if (currentSelected) {
        onFetchById(currentSelected.id);
      }
    }, [currentSelected, onFetchById]);
    useEffect(() => {
      if (pick) {
        setSubscriptionId(pick.subscriptionId);
        setCompetitionId(pick.match.competitionId);
        const _infoAdded = [];
        languages.forEach((l) => {
          const lan = pick.sections.filter((p) => p.language === l.code);
          const _values = [];
          lan.forEach((la) => {
            _values.push({
              title: la.title,
              description: la.description,
              id: la.id,
            });
          });
          _infoAdded.push({languageCode: l.code, values: _values});
        });
        setInfoAdded(_infoAdded);
      }
    }, [pick, languages]);

    useEffect(() => {
      onFetchingSubcriptionCompetition(true);
      onFetchSubscriptionCompetition(subscriptionId, competitionId);
    }, [
      subscriptionId,
      competitionId,
      pick?.match?.homeTeamId,
      pick?.match?.visitorTeamId,
      onFetchingSubcriptionCompetition,
      onFetchSubscriptionCompetition,
    ]);

    useEffect(() => {
      if (complete) {
        let objectTranslations = {};
        pick?.translations.forEach((s) => {
          const language_pick_ = `language_pick_${
            languages.find((l) => l.code === s.language)?.id
          }`;
          objectTranslations = {
            ...objectTranslations,
            [language_pick_]: s.prediction,
          };
        });
        setInitialValues({
          subscription: pick?.subscriptionId,
          competition: pick?.match?.competitionId,
          date: pick?.match?.date.split('T')[0],
          time: pick?.match?.date.split('T')[1].replace('Z', ''),
          team1: pick?.match?.homeTeamId,
          url: pick?.url,
          team2: pick?.match?.visitorTeamId,
          Recommendedinvestment: pick?.stake,
          benefit: pick?.benefit,
          ...objectTranslations,
        });
        onFetchingSubcriptionCompetition(false);
      }
    }, [complete, languages, onFetchingSubcriptionCompetition, pick]);
    useEffect(() => {
      if (searchValue.length > 0) {
        const listFilterPicks = picks?.data.filter(
          (item) =>
            item.matchHomeTeamName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.matchVisitorTeamName
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
        );
        const listFilterPicksDraft = picksDraft?.data.filter(
          (item) =>
            item.matchHomeTeamName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.matchVisitorTeamName
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
        );
        setPickList({...picks, data: [...listFilterPicks]});
        setPickDraftList({...picksDraft, data: [...listFilterPicksDraft]});
      } else {
        setPickList(picks);
        setPickDraftList(picksDraft);
      }
    }, [searchValue, picks, picksDraft]);
    const handleOnSelect = (item) =>
      isMobile
        ? router.push(`/Picks/PickManager?id=${item.id}`)
        : setCurrentSelected(item);

    const handleOnSubmit = useCallback(
      (values) => {
        const _translations = [];
        languages?.forEach((l) => {
          _translations.push({
            prediction: values[`language_pick_${l.id}`],
            language: languages.find((la) => la.id === l.id).code,
          });
        });
        onUpdate(
          currentSelected.id,
          buildBody(values, _translations, pick?.match?.id),
        );
        setCompetitionId();
        setSubscriptionId();
      },
      [languages, onUpdate, currentSelected, pick],
    );
    const handleOnChangeCompetition = (id) => setCompetitionId(id);
    const handleOnChangeSubscription = (id) => setSubscriptionId(id);
    return (
      permissions && (
        <Container maxW="full">
          <Text mb={8} fontWeight="bold" fontSize="18px">
            Todas tus picks
          </Text>
          <Select
            mb={4}
            placeholder="Subscripciones"
            value={subscriptionSelected}
            onChange={(e) => onChangeSubscription(e.target.value)}>
            {subscriptions?.data.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            leftElement={<LensGlass color="black" />}
            placeholder="Buscar pick"
            type="text"
          />
          <Text ml={4} mt={2} fontStyle="italic" fontSize="12px">
            {currentTab === 0
              ? `${pickDraftList?.data?.length} picks encontradas`
              : `${pickList?.data?.length} picks encontradas`}
          </Text>
          <Stack direction={['column', 'row']}>
            <Tabs
              mt={8}
              variant="enclosed"
              onChange={(index) => {
                setCurrentTab(index);
                setCurrentSelected(
                  index === 0 ? pickDraftList?.data?.[0] : pickList?.data?.[0],
                );
              }}
              isFitted={isMobile ? true : false}>
              <TabList>
                <Tab>Borradores</Tab>
                <Tab>Enviadas</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box overflow="scroll" h={!isMobile && height - 400}>
                    {pickDraftList?.data?.map((item) => (
                      <PickRow
                        onClick={() => handleOnSelect(item)}
                        key={item.id}
                        isSelected={currentSelected === item}
                        team1={item.matchHomeTeamName}
                        team2={item.matchVisitorTeamName}
                        matchDate={item.matchDate}
                      />
                    ))}
                  </Box>
                  <Pagination
                    {...pickDraftList}
                    onChangePage={(page) => onChangePageDraft(page)}
                    onSetPageSize={(pageS) => onChangeSizeDraft(pageS)}
                  />
                </TabPanel>
                <TabPanel>
                  <Box overflow="scroll" h={!isMobile && height - 400}>
                    {pickList?.data?.map((item) => (
                      <PickRow
                        onClick={() => handleOnSelect(item)}
                        isSelected={currentSelected === item}
                        key={item.id}
                        team1={item.matchHomeTeamName}
                        team2={item.matchVisitorTeamName}
                        matchDate={item.matchDate}
                      />
                    ))}
                  </Box>
                  <Pagination
                    {...pickList}
                    onChangePage={(page) => onChangePage(page)}
                    onSetPageSize={(pageS) => onChangeSize(pageS)}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {!isMobile && currentSelected && (
              <Container maxW="container.lg">
                {statusPick.isFetching ? (
                  <Loading />
                ) : (
                  <NewPickForm
                    firstButton={
                      currentTab === 0 ? 'Enviar pick' : 'Editar pick'
                    }
                    secondButton={
                      currentTab === 0 ? 'Guardar como borrador' : undefined
                    }
                    languages={languages}
                    subscriptions={subscriptions}
                    competitions={competitions}
                    teams={teams}
                    readOnly={currentTab !== 0 && !isAdmin}
                    defaultInfoAddded={infoAdded}
                    initialValues={initialValues}
                    onSubmit={handleOnSubmit}
                    onChangeCompetition={handleOnChangeCompetition}
                    onChangeSubscription={handleOnChangeSubscription}
                  />
                )}
              </Container>
            )}
          </Stack>
        </Container>
      )
    );
  },
);
Picks.Layout = HomeLayout;
export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
    user: selectUser(state),
    languages: selectLanguageLanguages(state),
    subscriptions: selectSubscriptions(state),
    teams: selectTeams(state),
    pick: selectPick(state),
    picks: selectPicks(state),
    picksDraft: selectPicksDraft(state),
    statusPick: selectPicksStatus(state),
    competitions: selectCompetitions(state),
    complete: selectComplete(state),
    pageSizeDraft: selectPageSizeDraft(state),
    pageNumberDraft: selectPageNumberDraft(state),
    pageSizeNoDraft: selectPageSizeNoDraft(state),
    pageNumberNoDraft: selectPageNumberNoDraft(state),
    subscriptionSelected: selectSubscriptionSelected(state),
  }),
  {
    onFetchSubscriptions: fetch,
    onFetchLanguages: fetchLanguages,
    onFetchPicks: fetchPicks,
    onFetchPicksDraft: fetchDraft,
    onFetchById: fetchById,
    onUpdate: update,
    onFetchSubscriptionCompetition: fetchSubscriptionCompetition,
    onFetchingSubcriptionCompetition: fetchingSubcriptionCompetition,
    onChangePage: changePage,
    onChangePageDraft: changePageDraft,
    onChangeSize: changeSize,
    onChangeSizeDraft: changeSizeDraft,
    onChangeSubscription: changeSubscription,
  },
)(Picks);
