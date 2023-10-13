import {all, call, put, take, select, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions, fetch} from '../actions/competition';
import {fetch as fetchSport} from '../actions/sport';
import {fetch as fetchTeam} from '../actions/team';
import {selectPage, selectSize} from '../selectors/competition';
import {CompetitionServices} from '../../services';
import {defaultParams} from '../../utils/constants';

export function* handleFetch({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: CompetitionServices,
      promise: (x) => x.fetch({...defaultParams, ...params}),
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
      Service: CompetitionServices,
      promise: (x) => x.fetchById(id),
    };
    yield call(task, action);
    yield take([actions.FETCH_ID_SUCCESS, actions.FETCH_ID_FAILED]);
  } catch (err) {
    console.log('Error handleFetchById: ', err);
  }
}

export function* handleCreate({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE),
      Service: CompetitionServices,
      promise: (x) => x.create(params),
    };
    yield call(task, action);
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
      Service: CompetitionServices,
      promise: (x) => x.update(id, params),
    };
    yield call(task, action);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetch({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleUpdate: ', err);
  }
}

export function* handleRemove({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.REMOVE),
      Service: CompetitionServices,
      promise: (x) => x.remove(id),
    };
    yield call(task, action);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetch({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleRemove: ', err);
  }
}

export function* handleInitialize() {
  yield put(fetchSport());
  yield put(fetchTeam());
}

export default function* competitionSagas() {
  yield all([
    takeLatest(actions.INITIALIZE, handleInitialize),
    takeLatest(actions.FETCH, handleFetch),
    takeLatest(actions.FETCH_ID, handleFetchById),
    takeLatest(actions.CREATE, handleCreate),
    takeLatest(actions.UPDATE, handleUpdate),
    takeLatest(actions.REMOVE, handleRemove),
  ]);
}
