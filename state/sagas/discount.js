import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions, fetch, addPicture} from '../actions/discount';
import {selectPage, selectSize} from '../selectors/discount';
import {DiscountServices} from '../../services';
import {defaultParams} from '../../utils/constants';

export function* handleFetchDiscounts({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: DiscountServices,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchDiscounts: ', err);
  }
}

export function* handleFetchMoreDiscounts({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_MORE),
      Service: DiscountServices,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchMoreDiscounts: ', err);
  }
}

export function* handleFetchDiscountsById({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_BY_ID),
      Service: DiscountServices,
      promise: (x) => x.fetchById(id),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchDiscountsById: ', err);
  }
}

export function* handleCreateUserDiscount({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE_USER_DISCOUNT),
      Service: DiscountServices,
      promise: (x) => x.createUserDiscount(params),
    };
    const response = yield call(task, action);
    if (params.picture) {
      yield put(addPicture(response.id, params.picture));
    }
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetch({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleCreateUserDiscount: ', err);
  }
}

export function* handleCreateSubscriptionDiscount({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE_SUBSCRIPTION_DISCOUNT),
      Service: DiscountServices,
      promise: (x) => x.createSubscriptionDiscount(params),
    };
    const response = yield call(task, action);
    if (params.picture) {
      yield put(addPicture(response.id, params.picture));
    }
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetch({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleCreateSubscriptionDiscount: ', err);
  }
}

export function* handleCreateAllDiscount({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE_ALL_DISCOUNT),
      Service: DiscountServices,
      promise: (x) => x.createAllDiscount(params),
    };
    const response = yield call(task, action);
    if (params.picture) {
      yield put(addPicture(response.id, params.picture));
    }
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetch({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleCreateAllDiscount: ', err);
  }
}

export function* handleAddPicture({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.ADD_PICTURE),
      Service: DiscountServices,
      promise: (x) => x.addPicture(id, params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleAddPicture: ', err);
  }
}

export default function* discountSagas() {
  yield all([
    takeLatest(actions.FETCH, handleFetchDiscounts),
    takeLatest(actions.FETCH_MORE, handleFetchMoreDiscounts),
    takeLatest(actions.FETCH_BY_ID, handleFetchDiscountsById),
    takeLatest(actions.CREATE_USER_DISCOUNT, handleCreateUserDiscount),
    takeLatest(
      actions.CREATE_SUBSCRIPTION_DISCOUNT,
      handleCreateSubscriptionDiscount,
    ),
    takeLatest(actions.CREATE_ALL_DISCOUNT, handleCreateAllDiscount),
    takeLatest(actions.ADD_PICTURE, handleAddPicture),
  ]);
}
