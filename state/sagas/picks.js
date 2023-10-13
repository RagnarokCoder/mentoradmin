import {all, call, put, take, select, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {
  actions,
  fetch,
  fetchDraft,
  fetchControlled,
  fetchNoControlled,
  fetchingSubcriptionCompetition,
} from '../actions/picks';
import {
  actions as actionsCompetition,
  fetch as fetchCompetition,
} from '../actions/competition';
import {actions as actionsteam, fetch as fetchTeam} from '../actions/team';
import {selectUser} from '../selectors/users';
import {
  selectPageSizeDraft,
  selectPageNumberDraft,
  selectPageSizeNoDraft,
  selectPageNumberNoDraft,
  selectSubscriptionSelected,
  selectPageSizeWithAnalisys,
  selectPageNumberWithAnalisys,
  selectPageSizeWithOutAnalisys,
  selectPageNumberWithOutAnalisys,
  selectSubscriptionSelectedBettingControl,
} from '../selectors/picks';
import {PicksServices} from '../../services';
import {defaultParams, roles} from '../../utils/constants';

export function* handleFetch({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: PicksServices,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetch: ', err);
  }
}

export function* handleFetchDraft({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_DRAFT),
      Service: PicksServices,
      promise: (x) => x.fetch({draft: true, ...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchDraft: ', err);
  }
}

export function* handleFetchControlled({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_CONTROLLED),
      Service: PicksServices,
      promise: (x) => x.fetch({controlled: true, ...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchControlled: ', err);
  }
}

export function* handleFetchNoControlled({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_NO_CONTROLLED),
      Service: PicksServices,
      promise: (x) => x.fetch({controlled: false, ...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchNoControlled: ', err);
  }
}

export function* handleFetchById({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_BY_ID),
      Service: PicksServices,
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
      Service: PicksServices,
      promise: (x) => x.create(params),
    };
    yield call(task, action);
    const user = yield select(selectUser);
    const pageSizeDraft = yield select(selectPageSizeDraft);
    const pageNumberDraft = yield select(selectPageNumberDraft);
    const pageSizeNoDraft = yield select(selectPageSizeNoDraft);
    const pageNumberNoDraft = yield select(selectPageNumberNoDraft);
    const subscriptionSelected = yield select(selectSubscriptionSelected);
    const isAdmin =
      user?.role === roles.admin || user?.role === roles.superadmin;
    yield put(
      fetch({
        assignedUserId: !isAdmin ? user?.id : undefined,
        pageSize: pageSizeNoDraft,
        pageNumber: pageNumberNoDraft,
        subscriptionId: subscriptionSelected,
      }),
    );
    yield put(
      fetchDraft({
        assignedUserId: !isAdmin ? user?.id : undefined,
        pageSize: pageSizeDraft,
        pageNumber: pageNumberDraft,
        subscriptionId: subscriptionSelected,
      }),
    );
  } catch (err) {
    console.log('Error handleCreate: ', err);
  }
}

export function* handleUpdate({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.UPDATE),
      Service: PicksServices,
      promise: (x) => x.update(id, params),
    };
    yield call(task, action);
    const user = yield select(selectUser);
    const isAdmin =
      user?.role === roles.admin || user?.role === roles.superadmin;
    const pageSizeDraft = yield select(selectPageSizeDraft);
    const pageNumberDraft = yield select(selectPageNumberDraft);
    const pageSizeNoDraft = yield select(selectPageSizeNoDraft);
    const pageNumberNoDraft = yield select(selectPageNumberNoDraft);
    const subscriptionSelected = yield select(selectSubscriptionSelected);
    yield put(
      fetch({
        assignedUserId: !isAdmin ? user?.id : undefined,
        pageSize: pageSizeNoDraft,
        pageNumber: pageNumberNoDraft,
        subscriptionId: subscriptionSelected,
      }),
    );
    yield put(
      fetchDraft({
        assignedUserId: !isAdmin ? user?.id : undefined,
        pageSize: pageSizeDraft,
        pageNumber: pageNumberDraft,
        subscriptionId: subscriptionSelected,
      }),
    );
  } catch (err) {
    console.log('Error handleUpdate: ', err);
  }
}

export function* handleDelete({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.DELETE),
      Service: PicksServices,
      promise: (x) => x.delete(id),
    };
    yield call(task, action);
    const user = yield select(selectUser);
    yield put(fetch({assignedUserId: user?.id}));
    yield put(fetchDraft({assignedUserId: user?.id}));
  } catch (err) {
    console.log('Error handleDelete: ', err);
  }
}

export function* handleFetchBettingControl({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_BETTING_CONTROL),
      Service: PicksServices,
      promise: (x) => x.fetchBettingControl(id, {...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchBettingControl: ', err);
  }
}

export function* handleCreateBettingControl({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE_BETTING_CONTROL),
      Service: PicksServices,
      promise: (x) => x.createBettingControl(id, params),
    };
    yield call(task, action);
    const user = yield select(selectUser);
    const isAdmin =
      user?.role === roles.admin || user?.role === roles.superadmin;
    const pageSizeWithAnalisys = yield select(selectPageSizeWithAnalisys);
    const pageNumberWithAnalisys = yield select(selectPageNumberWithAnalisys);
    const pageSizeWithOutAnalisys = yield select(selectPageSizeWithOutAnalisys);
    const pageNumberWithOutAnalisys = yield select(
      selectPageNumberWithOutAnalisys,
    );
    const subscriptionSelectedBettingControl = yield select(
      selectSubscriptionSelectedBettingControl,
    );
    yield put(
      fetchControlled({
        pageSize: pageSizeWithAnalisys,
        pageNumber: pageNumberWithAnalisys,
        assignedUserId: !isAdmin ? user?.id : undefined,
        subscriptionId: subscriptionSelectedBettingControl,
      }),
    );
    yield put(
      fetchNoControlled({
        pageSize: pageSizeWithOutAnalisys,
        pageNumber: pageNumberWithOutAnalisys,
        assignedUserId: !isAdmin ? user?.id : undefined,
        subscriptionId: subscriptionSelectedBettingControl,
      }),
    );
  } catch (err) {
    console.log('Error handleCreateBettingControl: ', err);
  }
}

export function* handleUpdateBettingControl({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.UPDATE_BETTING_CONTROL),
      Service: PicksServices,
      promise: (x) => x.updateBettingControl(id, params),
    };
    yield call(task, action);
    const user = yield select(selectUser);
    const isAdmin =
      user?.role === roles.admin || user?.role === roles.superadmin;
    const pageSizeWithAnalisys = yield select(selectPageSizeWithAnalisys);
    const pageNumberWithAnalisys = yield select(selectPageNumberWithAnalisys);
    const pageSizeWithOutAnalisys = yield select(selectPageSizeWithOutAnalisys);
    const pageNumberWithOutAnalisys = yield select(
      selectPageNumberWithOutAnalisys,
    );
    const subscriptionSelectedBettingControl = yield select(
      selectSubscriptionSelectedBettingControl,
    );
    yield put(
      fetchControlled({
        pageSize: pageSizeWithAnalisys,
        pageNumber: pageNumberWithAnalisys,
        assignedUserId: !isAdmin ? user?.id : undefined,
        subscriptionId: subscriptionSelectedBettingControl,
      }),
    );
    yield put(
      fetchNoControlled({
        pageSize: pageSizeWithOutAnalisys,
        pageNumber: pageNumberWithOutAnalisys,
        assignedUserId: !isAdmin ? user?.id : undefined,
        subscriptionId: subscriptionSelectedBettingControl,
      }),
    );
  } catch (err) {
    console.log('Error handleUpdateBettingControl: ', err);
  }
}

export function* handleFetchSubscriptionCompetitio({
  subscriptionId,
  competitionId,
}) {
  try {
    yield put(fetchCompetition({SubscriptionId: subscriptionId}));
    yield take([
      actionsCompetition.FETCH_SUCCESS,
      actionsCompetition.FETCH_FAILED,
    ]);
    yield put(fetchTeam({CompetitionId: competitionId}));
    yield take([actionsteam.FETCH_SUCCESS, actionsteam.FETCH_FAILED]);
    yield put(fetchingSubcriptionCompetition(true));
  } catch (err) {
    console.log('Error handleFetchSubscriptionCompetitio: ', err);
  }
}

export default function* picksSagas() {
  yield all([
    takeLatest(actions.FETCH, handleFetch),
    takeLatest(actions.FETCH_DRAFT, handleFetchDraft),
    takeLatest(actions.FETCH_CONTROLLED, handleFetchControlled),
    takeLatest(actions.FETCH_NO_CONTROLLED, handleFetchNoControlled),
    takeLatest(actions.FETCH_BY_ID, handleFetchById),
    takeLatest(actions.CREATE, handleCreate),
    takeLatest(actions.UPDATE, handleUpdate),
    takeLatest(actions.DELETE, handleDelete),
    takeLatest(actions.FETCH_BETTING_CONTROL, handleFetchBettingControl),
    takeLatest(actions.CREATE_BETTING_CONTROL, handleCreateBettingControl),
    takeLatest(actions.UPDATE_BETTING_CONTROL, handleUpdateBettingControl),
    takeLatest(
      actions.FETCH_SUBSCRIPTION_COMPETITION,
      handleFetchSubscriptionCompetitio,
    ),
  ]);
}
