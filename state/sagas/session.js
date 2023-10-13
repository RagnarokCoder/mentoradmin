import {all, call, put, takeLatest, select, take} from 'redux-saga/effects';
import Router from 'next/router';
import {actions} from '../actions/session';
import {fetchUserByExternalId} from '../actions/users';
import {actions as actionsUsers} from '../actions/users';
import {SessionServices} from '../../services';
import {selectUser} from '../selectors/users';

export function* handleSetToken(accessToken) {
  yield call(new SessionServices().setSessionCookies, accessToken);
}

export function* handleLogOut() {
  yield call(new SessionServices().setSessionCookies, '');
  yield call(new SessionServices().setUserId, '');
}

export function* handleSetUserId({sub}) {
  yield put(fetchUserByExternalId(sub));
  yield take([
    actionsUsers.FETCH_USER_BY_EXTERNAL_ID_SUCCESS,
    actionsUsers.FETCH_USER_BY_EXTERNAL_ID_FAILED,
  ]);
  const user = yield select(selectUser);
  if (user) {
    yield call(new SessionServices().setUserId, user.id);
    Router.push('./Home');
  }
}

export default function* sessionSagas() {
  yield all([
    takeLatest(actions.SET_TOKEN, handleSetToken),
    takeLatest(actions.SET_USER_ID, handleSetUserId),
    takeLatest(actions.LOG_OUT, handleLogOut),
  ]);
}
