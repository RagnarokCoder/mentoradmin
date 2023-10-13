import {all, call, put, take, select, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions, fetch, addPicture} from '../actions/team';
import {selectPage, selectSize} from '../selectors/team';
import {TeamServices} from '../../services';
import {defaultParams} from '../../utils/constants';

export function* handleFetch({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: TeamServices,
      promise: (x) => x.fetch({...defaultParams, pageSize: 20000, ...params}),
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
      Service: TeamServices,
      promise: (x) => x.fetchById(id),
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
      Service: TeamServices,
      promise: (x) => x.create({name: params.name}),
    };
    const response = yield call(task, action);
    if (params.file) {
      yield put(addPicture(response.id, params.file));
    }
    yield take(actions.ADD_PICTURE_SUCCESS);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetch({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleCreate: ', err);
  }
}

export function* handleUpdate({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.UPDATE),
      Service: TeamServices,
      promise: (x) => x.update(id, {name: params.name}),
    };
    const response = yield call(task, action);
    if (params.file) {
      yield put(addPicture(response.id, params.file));
      yield take(actions.ADD_PICTURE_SUCCESS);
    }
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetch({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleUpdate: ', err);
  }
}

export function* handleDelete({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.DELETE),
      Service: TeamServices,
      promise: (x) => x.delete(id),
    };
    yield call(task, action);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetch({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleDelete: ', err);
  }
}

export function* handleAddPicture({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.ADD_PICTURE),
      Service: TeamServices,
      promise: (x) => x.addPicture(id, params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleAddPicture: ', err);
  }
}

export default function* teamSagas() {
  yield all([
    takeLatest(actions.FETCH, handleFetch),
    takeLatest(actions.FETCH_ID, handleFetchById),
    takeLatest(actions.CREATE, handleCreate),
    takeLatest(actions.UPDATE, handleUpdate),
    takeLatest(actions.DELETE, handleDelete),
    takeLatest(actions.ADD_PICTURE, handleAddPicture),
  ]);
}
