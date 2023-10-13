import {all, call, put, select, take, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions, addPicture, fetch} from '../actions/subscriptions';
import {SubscriptionsServices} from '../../services';
import {selectPage, selectSize} from '../selectors/subscriptions';
import {selectUser} from '../selectors/users';
import Router from 'next/router';
import {defaultParams, roles} from '../../utils/constants';

export function* handleFetch({query}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: SubscriptionsServices,
      promise: (x) => x.fetchSubscriptions({...defaultParams, ...query}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetch: ', err);
  }
}

export function* handleFetchById({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_ID),
      Service: SubscriptionsServices,
      promise: (x) => x.fetchSubscriptionDetail(id),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchById: ', err);
  }
}

export function* handleCreate({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE),
      Service: SubscriptionsServices,
      promise: (x) => x.createSubscription(params),
    };
    const response = yield call(task, action);
    yield put(addPicture(response.id, params.picture));
    yield take(actions.ADD_PICTURE_SUCCESS);
    yield call(Router.push, '/Subscriptions');
  } catch (err) {
    console.log('Error handleCreate: ', err);
  }
}

export function* handleUpdate({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.UPDATE),
      Service: SubscriptionsServices,
      promise: (x) => x.editSubscription(id, params),
    };
    const response = yield call(task, action);
    if (params.picture) {
      yield put(addPicture(response.id, params.picture));
      yield take(actions.ADD_PICTURE_SUCCESS);
    }
    yield call(Router.push, '/Subscriptions');
  } catch (err) {
    console.log('Error handleUpdate: ', err);
  }
}

export function* handleDelete({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.DELETE),
      Service: SubscriptionsServices,
      promise: (x) => x.deleteSubscription(id),
    };
    yield call(task, action);
    yield call(Router.push, '/Subscriptions');
  } catch (err) {
    console.log('Error handleDelete: ', err);
  }
}

export function* handleAddPicture({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.ADD_PICTURE),
      Service: SubscriptionsServices,
      promise: (x) => x.addPictureSubscription(id, params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleAddPicture: ', err);
  }
}

export function* handleOrder({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.ORDER),
      Service: SubscriptionsServices,
      promise: (x) => x.orderSubscription(params),
    };
    yield call(task, action);
    const user = yield select(selectUser);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    const isAdmin =
      user?.role === roles.admin || user?.role === roles.superadmin;
    yield put(
      fetch({
        orderBy: 'indexOrder',
        sortOrder: 0,
        AssignedUserId: !isAdmin ? user?.id : undefined,
        pageSize: size,
        pageNumber: page,
      }),
    );
  } catch (err) {
    console.log('Error handleOrder: ', err);
  }
}

export default function* subscriptionsSagas() {
  yield all([
    takeLatest(actions.FETCH, handleFetch),
    takeLatest(actions.FETCH_ID, handleFetchById),
    takeLatest(actions.CREATE, handleCreate),
    takeLatest(actions.UPDATE, handleUpdate),
    takeLatest(actions.DELETE, handleDelete),
    takeLatest(actions.ADD_PICTURE, handleAddPicture),
    takeLatest(actions.ORDER, handleOrder),
  ]);
}
