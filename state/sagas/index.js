import {all, fork} from 'redux-saga/effects';
import uiSagas, {handleRouteChangeStart} from './ui';
import competitionSagas from './competition';
import teamSagas from './team';
import sessionSagas from './session';
import sportSagas from './sport';
import usersSagas from './users';
import subscriptionsSagas from './subscriptions';
import languageSagas from './language';
import countrySagas from './country';
import notificationSagas from './notifications';
import picksSagas from './picks';
import postSagas from './post';
import discountSagas from './discount';
import adminSagas from './admin';
import reportSagas from './report';
import userSubscriptionReportSagas from './userSubscriptionReport';

function* watchRoot() {
  yield all([
    fork(uiSagas),
    fork(handleRouteChangeStart),
    fork(competitionSagas),
    fork(teamSagas),
    fork(sessionSagas),
    fork(sportSagas),
    fork(usersSagas),
    fork(subscriptionsSagas),
    fork(languageSagas),
    fork(countrySagas),
    fork(notificationSagas),
    fork(picksSagas),
    fork(postSagas),
    fork(discountSagas),
    fork(adminSagas),
    fork(reportSagas),
    fork(userSubscriptionReportSagas),
  ]);
}

export default watchRoot;
