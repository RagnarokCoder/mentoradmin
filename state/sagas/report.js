import {all, call, takeLatest, put, select} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions, fetchNoResolved, fetchResolved} from '../actions/report';
import {ReportServices} from '../../services';
import {defaultParams} from '../../utils/constants';
import {
  selectPagePageNoResolved,
  selectPagePageResolved,
  selectPageSizeNoResolved,
  selectPageSizeResolved,
} from '../selectors/report';

export function* handleFetchReportResolved({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_RESOLVED),
      Service: ReportServices,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchReport: ', err);
  }
}

export function* handleFetchNoReportResolved({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_NO_RESOLVED),
      Service: ReportServices,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchReport: ', err);
  }
}

export function* handleFetchReportById({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_BY_ID),
      Service: ReportServices,
      promise: (x) => x.fetchById(id),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchReportById: ', err);
  }
}

export function* handleCreateReport({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE),
      Service: ReportServices,
      promise: (x) => x.create(params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleCreateReport: ', err);
  }
}

export function* handleEditReport({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.EDIT),
      Service: ReportServices,
      promise: (x) => x.edit(id, params),
    };
    yield call(task, action);
    const pagePageNoResolved = yield select(selectPagePageNoResolved);
    const pagePageResolved = yield select(selectPagePageResolved);
    const pageSizeNoResolved = yield select(selectPageSizeNoResolved);
    const pageSizeResolved = yield select(selectPageSizeResolved);
    yield put(
      fetchNoResolved({
        pageSize: pageSizeNoResolved,
        pageNumber: pagePageNoResolved,
        status: 'Waiting',
      }),
    );
    yield put(
      fetchResolved({
        pageSize: pageSizeResolved,
        pageNumber: pagePageResolved,
        status: 'Reviewed',
      }),
    );
  } catch (err) {
    console.log('Error handleEditReport: ', err);
  }
}

export default function* reportSagas() {
  yield all([
    takeLatest(actions.FETCH_RESOLVED, handleFetchReportResolved),
    takeLatest(actions.FETCH_NO_RESOLVED, handleFetchNoReportResolved),
    takeLatest(actions.FETCH_BY_ID, handleFetchReportById),
    takeLatest(actions.CREATE, handleCreateReport),
    takeLatest(actions.EDIT, handleEditReport),
  ]);
}
