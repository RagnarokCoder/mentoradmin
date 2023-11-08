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
import {connect} from 'react-redux';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {useRouter} from 'next/router';
import LensGlass from '../../assets/Icons/LensGlass';
import useWindowsDimension from '../../hooks/useWindowsDimension';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Pagination from '../../components/Pagination';
import PickRow from '../../components/PickRow';
import BettingControlForm from '../../components/Bettingcontrol/BettingControlForm';
import {getPrefit} from '../../components/Bettingcontrol/utils';
import {
  fetchControlled,
  fetchNoControlled,
  fetchBettingControl,
  createBettingControl,
  updateBettingControl,
  changePageWithAnalisys,
  changePageWithOutAnalisys,
  changeSizeWithAnalisys,
  changeSizeWithOutAnalisys,
  changeSubscriptionBettingControl,
} from '../../state/actions/picks';
import {fetch as fetchSubscriptions} from '../../state/actions/subscriptions';
import {selectIsPermissions, selectUser} from '../../state/selectors/users';
import {
  selectPicksControlled,
  selectPicksNoControlled,
  selectBettingControl,
  selectPicksStatus,
  selectPageSizeWithAnalisys,
  selectPageNumberWithAnalisys,
  selectPageSizeWithOutAnalisys,
  selectPageNumberWithOutAnalisys,
  selectSubscriptionSelectedBettingControl,
} from '../../state/selectors/picks';
import {selectSubscriptions} from '../../state/selectors/subscriptions';
import {selectLanguageLanguages} from '../../state/selectors/language';
import {HomeLayout} from '../../layouts';
import useRoles from '../../hooks/useRoles';

const Bettingcontrol = withAuthenticationRequired(
  ({
    user,
    languages,
    permissions,
    picksControlled,
    picksNoControlled,
    subscriptions,
    statusPick,
    bettingControl,
    pageSizeWithAnalisys,
    pageNumberWithAnalisys,
    pageSizeWithOutAnalisys,
    pageNumberWithOutAnalisys,
    subscriptionSelectedBettingControl,
    onFetchControlled,
    onFetchNoControlled,
    onFetchSubscriptions,
    onFetchBettingControl,
    onCreateBettingControl,
    onUpdateBettingControl,
    onChangePageWithAnalisys,
    onChangePageWithOutAnalisys,
    onChangeSizeWithAnalisys,
    onChangeSizeWithOutAnalisys,
    onChangeSubscriptionBettingControl,
  }) => {
    const router = useRouter();
    const {height} = useWindowsDimension();
    const isMobile = useBreakpointValue({base: true, xl: false});
    const [searchValue, setSearchValue] = useState('');
    const [currentSelected, setCurrentSelected] = useState();
    const [pickControlledList, setPickControlledList] = useState([]);
    const [pickNoControlledList, setPickNoControlledList] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [initialValues, setInitialValues] = useState();
    // const {isAdmin} = useRoles();
    const {isAdmin} = true;

    useEffect(() => {
      onFetchSubscriptions({
        PreSaleDateEnd: new Date().toISOString().split('T')[0],
        EndDateBegin: new Date().toISOString().split('T')[0],
        AssignedUserId: !isAdmin ? user?.id : undefined,
      });
    }, [user, onFetchSubscriptions, isAdmin]);

    useEffect(() => {
      onFetchControlled({
        pageSize: pageSizeWithAnalisys,
        pageNumber: pageNumberWithAnalisys,
        assignedUserId: !isAdmin ? user?.id : undefined,
        subscriptionId: subscriptionSelectedBettingControl,
      });
    }, [
      isAdmin,
      onFetchControlled,
      pageNumberWithAnalisys,
      pageSizeWithAnalisys,
      subscriptionSelectedBettingControl,
      user,
    ]);

    useEffect(() => {
      onFetchNoControlled({
        pageSize: pageSizeWithOutAnalisys,
        pageNumber: pageNumberWithOutAnalisys,
        assignedUserId: !isAdmin ? user?.id : undefined,
        subscriptionId: subscriptionSelectedBettingControl,
      });
    }, [
      isAdmin,
      onFetchNoControlled,
      pageNumberWithOutAnalisys,
      pageSizeWithOutAnalisys,
      subscriptionSelectedBettingControl,
      user,
    ]);

    useEffect(() => {
      setCurrentSelected(pickNoControlledList?.data?.[0]);
    }, [pickNoControlledList?.data]);

    useEffect(() => {
      if (currentSelected) {
        onFetchBettingControl(currentSelected.id);
      }
    }, [currentSelected, onFetchBettingControl]);

    useEffect(() => {
      if (searchValue.length > 0) {
        const listFilterPicksControlled = picksControlled?.data.filter(
          (item) =>
            item.matchHomeTeamName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.matchVisitorTeamName
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
        );
        const listFilterPicksNoControlled = picksNoControlled?.data.filter(
          (item) =>
            item.matchHomeTeamName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.matchVisitorTeamName
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
        );
        setPickControlledList({
          ...picksControlled,
          data: [...listFilterPicksControlled],
        });
        setPickNoControlledList({
          ...picksNoControlled,
          data: [...listFilterPicksNoControlled],
        });
      } else {
        setPickControlledList(picksControlled);
        setPickNoControlledList(picksNoControlled);
      }
    }, [searchValue, picksControlled, picksNoControlled]);

    useEffect(() => {
      if (bettingControl) {
        let objectTranslations = {};
        bettingControl?.pickTranslations.forEach((s) => {
          const language_pick_ = `language_pick_${
            languages.find((l) => l.code === s.language)?.id
          }`;
          objectTranslations = {
            ...objectTranslations,
            [language_pick_]: s.prediction,
          };
        });
        setInitialValues({
          team1: bettingControl.matchHomeTeamName,
          team1Result: bettingControl.matchHomeTeamScore,
          team2: bettingControl.matchVisitorTeamName,
          team2Result: bettingControl.matchVisitorTeamScore,
          forecast: bettingControl.predictionStatus.toLowerCase(),
          recommendedInvestment: bettingControl.pickStake,
          benefit: bettingControl.pickBenefit,
          subscription: subscriptions?.data.find(
            (s) => s.id === bettingControl.subscriptionId,
          )?.name,
          ...objectTranslations,
        });
      }
    }, [bettingControl, languages, subscriptions]);

    const handleOnSelect = (item) =>
      isMobile
        ? router.push(`/Bettingcontrol/BettingControlManager?id=${item.id}`)
        : setCurrentSelected(item);

    const handleOnSubmit = useCallback(
      (values) => {
        const body = {
          predictionStatus: values.forecast,
          profit: getPrefit(values),
          homeTeamScore: values.team1Result,
          visitorTeamScore: values.team2Result,
          controlled: true,
        };
        currentTab === 0
          ? onCreateBettingControl(currentSelected.id, body)
          : onUpdateBettingControl(currentSelected.id, body);
      },
      [
        currentTab,
        onCreateBettingControl,
        onUpdateBettingControl,
        currentSelected,
      ],
    );
    return (
      // permissions && (
        <Container maxW="full" mt={30}>
          <Text mb={8} fontWeight="bold" fontSize="18px">
            Todas tus picks
          </Text>
          <Select
            mb={4}
            placeholder="Subscripciones"
            value={subscriptionSelectedBettingControl}
            onChange={(e) =>
              onChangeSubscriptionBettingControl(e.target.value)
            }>
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
              ? `${pickNoControlledList?.data?.length} picks encontradas`
              : `${pickControlledList?.data?.length} picks encontradas`}
          </Text>
          <Stack direction={['column', 'row']}>
            <Tabs
              mt={8}
              variant="enclosed"
              onChange={(index) => {
                setCurrentTab(index);
                setCurrentSelected(
                  index === 0
                    ? pickNoControlledList?.data?.[0]
                    : pickControlledList?.data?.[0],
                );
              }}
              isFitted={isMobile ? true : false}>
              <TabList>
                <Tab>Sin analisis</Tab>
                <Tab>Con analisis</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box overflow="scroll" h={!isMobile && height - 400}>
                    {pickNoControlledList?.data?.map((item) => (
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
                    {...pickNoControlledList}
                    onChangePage={(page) => onChangePageWithOutAnalisys(page)}
                    onSetPageSize={(pageS) =>
                      onChangeSizeWithOutAnalisys(pageS)
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <Box overflow="scroll" h={!isMobile && height - 400}>
                    {pickControlledList?.data?.map((item) => (
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
                    {...pickControlledList}
                    onChangePage={(page) => onChangePageWithAnalisys(page)}
                    onSetPageSize={(pageS) => onChangeSizeWithAnalisys(pageS)}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {!isMobile && currentSelected && (
              <Container>
                {statusPick.isFetching ? (
                  <Loading />
                ) : (
                  <BettingControlForm
                    initialValues={initialValues}
                    languages={languages}
                    buttonLabel={
                      currentTab === 0 ? 'Enviar análisis' : 'Editar análisis'
                    }
                    onSubmit={handleOnSubmit}
                  />
                )}
              </Container>
            )}
          </Stack>
        </Container>
      // )
    );
  },
);

Bettingcontrol.Layout = HomeLayout;
export default connect(
  (state) => ({
    user: selectUser(state),
    permissions: selectIsPermissions(state),
    picksControlled: selectPicksControlled(state),
    picksNoControlled: selectPicksNoControlled(state),
    statusPick: selectPicksStatus(state),
    bettingControl: selectBettingControl(state),
    subscriptions: selectSubscriptions(state),
    languages: selectLanguageLanguages(state),
    pageSizeWithAnalisys: selectPageSizeWithAnalisys(state),
    pageNumberWithAnalisys: selectPageNumberWithAnalisys(state),
    pageSizeWithOutAnalisys: selectPageSizeWithOutAnalisys(state),
    pageNumberWithOutAnalisys: selectPageNumberWithOutAnalisys(state),
    subscriptionSelectedBettingControl:
      selectSubscriptionSelectedBettingControl(state),
  }),
  {
    onFetchControlled: fetchControlled,
    onFetchNoControlled: fetchNoControlled,
    onFetchBettingControl: fetchBettingControl,
    onCreateBettingControl: createBettingControl,
    onUpdateBettingControl: updateBettingControl,
    onFetchSubscriptions: fetchSubscriptions,
    onChangePageWithAnalisys: changePageWithAnalisys,
    onChangePageWithOutAnalisys: changePageWithOutAnalisys,
    onChangeSizeWithAnalisys: changeSizeWithAnalisys,
    onChangeSizeWithOutAnalisys: changeSizeWithOutAnalisys,
    onChangeSubscriptionBettingControl: changeSubscriptionBettingControl,
  },
)(Bettingcontrol);
