import {useEffect, useState, useCallback} from 'react';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {useRouter} from 'next/router';
import {Container} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {HomeLayout} from '../../layouts';
import {selectIsPermissions} from '../../state/selectors/users';
import BettingControlForm from '../../components/Bettingcontrol/BettingControlForm';
import {getPrefit} from '../../components/Bettingcontrol/utils';
import {
  fetchBettingControl,
  fetchById,
  createBettingControl,
  updateBettingControl,
} from '../../state/actions/picks';
import {selectBettingControl, selectPick} from '../../state/selectors/picks';
import {selectSubscriptions} from '../../state/selectors/subscriptions';
import {selectLanguageLanguages} from '../../state/selectors/language';

const BettingControlManager = withAuthenticationRequired(
  ({
    languages,
    permissions,
    bettingControl,
    subscriptions,
    pick,
    onFetchById,
    onFetchBettingControl,
    onCreateBettingControl,
    onUpdateBettingControl,
  }) => {
    const [initialValues, setInitialValues] = useState();
    const [bettingControlId, setBettingControlId] = useState();
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
      if (id) {
        onFetchBettingControl(id);
        onFetchById(id);
      }
    }, [id, onFetchById, onFetchBettingControl]);
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
        setBettingControlId(bettingControl?.id);
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

    const handleOnSubmit = useCallback(
      (values) => {
        const body = {
          id: bettingControlId,
          predictionStatus: values.forecast,
          profit: getPrefit(values),
          homeTeamScore: values.team1Result,
          visitorTeamScore: values.team2Result,
          controlled: true,
        };
        !pick?.controlled
          ? onCreateBettingControl(id, body)
          : onUpdateBettingControl(id, body);
      },
      [
        bettingControlId,
        id,
        onCreateBettingControl,
        onUpdateBettingControl,
        pick?.controlled,
      ],
    );
    return (
      permissions && (
        <Container maxW="full">
          <BettingControlForm
            initialValues={initialValues}
            languages={languages}
            buttonLabel={
              !pick?.controlled ? 'Enviar análisis' : 'Editar análisis'
            }
            onSubmit={handleOnSubmit}
          />
        </Container>
      )
    );
  },
);

BettingControlManager.Layout = HomeLayout;
export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
    bettingControl: selectBettingControl(state),
    subscriptions: selectSubscriptions(state),
    pick: selectPick(state),
    languages: selectLanguageLanguages(state),
  }),
  {
    onFetchById: fetchById,
    onFetchBettingControl: fetchBettingControl,
    onCreateBettingControl: createBettingControl,
    onUpdateBettingControl: updateBettingControl,
  },
)(BettingControlManager);
