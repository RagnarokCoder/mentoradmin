import {useEffect, useState, useCallback} from 'react';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {useRouter} from 'next/router';
import {Container} from '@chakra-ui/react';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import NewPickForm from '../../components/Picks/NewPickForm';
import {buildBody} from '../../components/Picks/util';
import {HomeLayout} from '../../layouts';
import {selectIsPermissions} from '../../state/selectors/users';
import {selectLanguageLanguages} from '../../state/selectors/language';
import {selectSubscriptions} from '../../state/selectors/subscriptions';
import {selectTeams} from '../../state/selectors/team';
import {selectUser} from '../../state/selectors/users';
import {selectPicksStatus, selectPick} from '../../state/selectors/picks';
import {selectCompetitions} from '../../state/selectors/competition';
import {fetch} from '../../state/actions/subscriptions';
import {fetch as fetchTeam} from '../../state/actions/team';
import {fetchLanguages} from '../../state/actions/language';
import {create, update, fetchById} from '../../state/actions/picks';
import {fetch as fetchCompetitions} from '../../state/actions/competition';
import useRoles from '../../hooks/useRoles';

const PickManager = withAuthenticationRequired(
  ({
    status,
    permissions,
    user,
    pick,
    languages,
    subscriptions,
    teams,
    competitions,
    onFetchSubscriptions,
    onFetchTeam,
    onFetchLanguages,
    onFetchCompetitions,
    onCreate,
    onUpdate,
    onFetchById,
  }) => {
    const router = useRouter();
    const {id} = router.query;
    const {subscription} = router.query;
    const [subscriptionId, setSubscriptionId] = useState();
    const [competitionId, setCompetitionId] = useState();
    const [infoAdded, setInfoAdded] = useState([]);
    const [initialValues, setInitialValues] = useState();
    const {isAdmin} = useRoles();

    useEffect(() => {
      if (id) {
        onFetchById(id);
      }
    }, [id, onFetchById]);
    useEffect(() => {
      if (pick && id) {
        setCompetitionId(pick.match.competitionId);
        setSubscriptionId(pick.subscriptionId);
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
          team2: pick?.match?.visitorTeamId,
          pick: pick?.prediction,
          Recommendedinvestment: pick?.stake,
          benefit: pick?.benefit,
          ...objectTranslations,
        });
        setInfoAdded([..._infoAdded]);
      }
    }, [pick, id, languages]);
    useEffect(() => {
      isAdmin
        ? onFetchSubscriptions({
            PreSaleDateEnd: new Date().toISOString().split('T')[0],
            EndDateBegin: new Date().toISOString().split('T')[0],
          })
        : onFetchSubscriptions({AssignedUserId: user?.id});
    }, [user, onFetchSubscriptions, isAdmin]);
    useEffect(() => {
      if (competitionId) {
        onFetchTeam({CompetitionId: competitionId});
      }
    }, [competitionId, onFetchTeam]);
    useEffect(() => {
      onFetchLanguages();
    }, [onFetchLanguages]);
    useEffect(() => {
      if (subscriptionId) {
        onFetchCompetitions({SubscriptionId: subscriptionId});
      }
    }, [subscriptionId, onFetchCompetitions]);
    useEffect(() => {
      if (subscription) {
        setSubscriptionId(subscription);
      }
    }, [subscription]);

    const handleOnSubmit = useCallback(
      (values) => {
        const _translations = [];
        languages?.forEach((l) => {
          _translations.push({
            prediction: values[`language_pick_${l.id}`],
            language: languages.find((la) => la.id === l.id).code,
          });
        });
        id
          ? onUpdate(id, buildBody(values, _translations, pick?.match?.id))
          : onCreate(buildBody(values, _translations));
        setCompetitionId();
        setSubscriptionId();
      },
      [languages, id, onUpdate, pick, onCreate],
    );
    const handleOnChangeCompetition = (_id) => setCompetitionId(_id);
    const handleOnChangeSubscription = (_id) => setSubscriptionId(_id);
    return (
      
        <Container maxW="full">
          {status.isFetching && <Loading />}
          <NewPickForm
            firstButton="Enviar pick"
            secondButton="Guardar como borrador"
            languages={languages}
            subscriptions={subscriptions}
            competitions={competitions}
            teams={teams}
            defautlValueDraft={id ? false : undefined}
            initialValues={initialValues}
            subscriptionId={subscription}
            defaultInfoAddded={infoAdded}
            onSubmit={handleOnSubmit}
            onChangeCompetition={handleOnChangeCompetition}
            onChangeSubscription={handleOnChangeSubscription}
          />
        </Container>
      
    );
  },
);

PickManager.Layout = HomeLayout;
export default connect(
  (state) => ({
    status: selectPicksStatus(state),
    permissions: selectIsPermissions(state),
    user: selectUser(state),
    languages: selectLanguageLanguages(state),
    subscriptions: selectSubscriptions(state),
    teams: selectTeams(state),
    competitions: selectCompetitions(state),
    pick: selectPick(state),
  }),
  {
    onFetchSubscriptions: fetch,
    onFetchTeam: fetchTeam,
    onFetchLanguages: fetchLanguages,
    onCreate: create,
    onUpdate: update,
    onFetchById: fetchById,
    onFetchCompetitions: fetchCompetitions,
  },
)(PickManager);
