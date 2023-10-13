import {all, call, put, select, take, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions, createRole} from '../actions/admin';
import {selectRoles} from '../selectors/admin';
import {selectPage, selectSize} from '../selectors/users';
import {fetchUsers} from '../actions/users';
import {AdminServices} from '../../services';

export function* handleFetch({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: AdminServices,
      promise: (x) => x.fetch(params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetch: ', err);
  }
}

export function* handleCreateUser({body, role}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE_USER),
      Service: AdminServices,
      promise: (x) => x.createUser(body),
    };
    const response = yield call(task, action);
    const roles = yield select(selectRoles);
    const _role = roles.find(
      (r) => r.name.toLowerCase() === role.toLowerCase(),
    );
    yield put(
      createRole(response.id, {
        roleId: _role.id,
        roleName: _role.name,
      }),
    );
    yield take([actions.CREATE_ROLE_SUCCESS, actions.CREATE_ROLE_FAILED]);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(
      fetchUsers({deleted: false, role, pageSize: size, pageNumber: page}),
    );
  } catch (err) {
    console.log('Error handleCreateUser: ', err);
  }
}

export function* handleCreateRole({id, body}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE_ROLE),
      Service: AdminServices,
      promise: (x) => x.createRoles(id, body),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleCreateRole: ', err);
  }
}

export function* handleDeleteRole({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.DELETE_ROLE),
      Service: AdminServices,
      promise: (x) => x.deleteRoles(id),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleDeleteRole: ', err);
  }
}

export function* handleFetchRole({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_ROLE),
      Service: AdminServices,
      promise: (x) => x.fetchRole(id, params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchRole: ', err);
  }
}

export function* handleGive({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.GIVE),
      Service: AdminServices,
      promise: (x) => x.giveSubscription(id, params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleGive: ', err);
  }
}

export default function* languageSagas() {
  yield all([
    takeLatest(actions.FETCH, handleFetch),
    takeLatest(actions.CREATE_USER, handleCreateUser),
    takeLatest(actions.CREATE_ROLE, handleCreateRole),
    takeLatest(actions.DELETE_ROLE, handleDeleteRole),
    takeLatest(actions.FETCH_ROLE, handleFetchRole),
    takeLatest(actions.GIVE, handleGive),
  ]);
}
