import {all, put, select, takeLatest} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import Router from 'next/router';
import {take} from 'redux-saga/effects';
import {actions as sessionActions} from '../actions/session';
import {actions, changeRoute} from '../actions/ui';
import {actions as usersActions, setPermissions} from '../actions/users';
import {selectUser} from '../selectors/users';
import {SessionServices} from '../../services';

export function* handleRouteChangeStart() {
  const channel = eventChannel((emitter) => {
    Router.events.on('routeChangeComplete', emitter);
    return () => Router.events.off('routeChangeComplete', emitter);
  });
  while (true) {
    const path = yield take(channel);
    yield put(changeRoute(path));
  }
}

/**
 * Dispatch the first page view as a route change to sync UI config.
 */
export function* handleInitializeUi() {
  yield put(changeRoute(Router.pathname));
}

export function* handleChangeRoute({path}) {
  const sessionServices = new SessionServices();
  let user;
  user = yield select(selectUser);
  if (!user) {
    yield take(usersActions.FETCH_USER_SUCCESS);
  }
  user = yield select(selectUser);
  const isPermissions = sessionServices.checkPermissions(path, user?.role);
  yield put(setPermissions(isPermissions));
  if (!isPermissions) {
    Router.push('/NoPermissions');
  }
}

export default function* uiSagas() {
  yield all([
    takeLatest(actions.CHANGE_ROUTE, handleChangeRoute),
    takeLatest(sessionActions.INITIALIZE, handleInitializeUi),
  ]);
}
