import {all, call, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions} from '../actions/userSubscriptionReport';
import {UserSubscriptionReport} from '../../services';

export function* handleFetchUserSubscriptionReport() {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: UserSubscriptionReport,
      promise: (x) => x.fetch(),
    };
    const data = yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchUserSubscriptionReport: ', err);
  }
}

export default function* userSubscriptionReportSagas() {
  yield all([takeLatest(actions.FETCH, handleFetchUserSubscriptionReport)]);
}
