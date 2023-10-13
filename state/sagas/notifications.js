import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions, fetchNotifications} from '../actions/notifications';
import {notify} from '../actions/post';
import {selectPage, selectSize} from '../selectors/notifications';
import {NotificationsServices} from '../../services';
import {defaultParams} from '../../utils/constants';

export function* handleFetchNotifications({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: NotificationsServices,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchNotifications: ', err);
  }
}

export function* handleCreateNotifications({body}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE),
      Service: NotificationsServices,
      promise: (x) => x.create(body),
    };
    yield call(task, action);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetchNotifications({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleCreateNotifications: ', err);
  }
}

export function* handleCreateUserNotifications({body}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE_USER),
      Service: NotificationsServices,
      promise: (x) => x.createUser(body),
    };
    yield call(task, action);
    if (body.postId) {
      yield put(notify(body.postId, {warned: true}));
    }
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetchNotifications({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleCreateUserNotifications: ', err);
  }
}

export default function* notificationSagas() {
  yield all([
    takeLatest(actions.FETCH, handleFetchNotifications),
    takeLatest(actions.CREATE, handleCreateNotifications),
    takeLatest(actions.CREATE_USER, handleCreateUserNotifications),
  ]);
}
