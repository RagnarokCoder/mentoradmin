import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions} from '../actions/users';
import {UsersServices, SessionServices} from '../../services';
import {
  selectUser,
  selectPage,
  selectSize,
  selectPageDelete,
  selectSizeDelete,
} from '../selectors/users';
import {
  fetchPicture,
  fetchUsers,
  fetchUsersDeleted,
  fetchUser,
} from '../actions/users';

export function* handleFetchUsers({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_USERS),
      Service: UsersServices,
      promise: (x) => x.fetchUsers({...{deleted: false}, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchUsers: ', err);
  }
}

export function* handleFetchUsersDeleted({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_USERS_DELETED),
      Service: UsersServices,
      promise: (x) => x.fetchUsers(params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchUsersDeleted: ', err);
  }
}

export function* handleFetchUser() {
  try {
    const sessionServices = new SessionServices();
    const id = yield call(sessionServices.getUserIdFromCookies);
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_USER),
      Service: UsersServices,
      promise: (x) => x.fetchUser(id),
    };
    const user = yield call(task, action);
    yield put(fetchPicture(user.id));
  } catch (err) {
    console.log('Error handleFetchUser: ', err);
  }
}

export function* handleCreateUser({user}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE_USER),
      Service: UsersServices,
      promise: (x) => x.createUser(user),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleCreateUser: ', err);
  }
}

export function* handleDeleteUser({id, role}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.DELETE_USER),
      Service: UsersServices,
      promise: (x) => x.deleteUser(id),
    };
    yield call(task, action);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    const pageDelete = yield select(selectPageDelete);
    const sizeDelete = yield select(selectSizeDelete);
    yield put(fetchUsers({role, pageSize: size, pageNumber: page}));
    yield put(
      fetchUsersDeleted({
        deleted: true,
        role,
        pageSize: sizeDelete,
        pageNumber: pageDelete,
      }),
    );
  } catch (err) {
    console.log('Error handleDeleteUser: ', err);
  }
}

export function* handleEditUser({user}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.EDIT_USER),
      Service: UsersServices,
      promise: (x) => x.editUser(user),
    };
    yield call(task, action);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    const pageDelete = yield select(selectPageDelete);
    const sizeDelete = yield select(selectSizeDelete);
    yield put(fetchUsers({pageSize: size, pageNumber: page}));
    yield put(fetchUser({pageSize: sizeDelete, pageNumber: pageDelete}));
  } catch (err) {
    console.log('Error handleEditUser: ', err);
  }
}

export function* handleSetPicture({picture, id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.SET_PICTURE),
      Service: UsersServices,
      promise: (x) => x.setPicture(picture, id),
    };
    yield call(task, action);
    const user = yield select(selectUser);
    yield put(fetchPicture(user.id));
  } catch (err) {
    console.log('Error handleSetPicture: ', err);
  }
}

export function* handleFetchPicture({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_PICTURE),
      Service: UsersServices,
      promise: (x) => x.fetchPicture(id),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchPicture: ', err);
  }
}

export function* handleBannedUser({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.BANNED_USER),
      Service: UsersServices,
      promise: (x) => x.bannedUser(id, params),
    };
    yield call(task, action);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetchUsers({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleBannedUser: ', err);
  }
}

export function* handleVerifiedUser({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.VERIFIED_USER),
      Service: UsersServices,
      promise: (x) => x.verifiedUser(id, params),
    };
    yield call(task, action);
    const page = yield select(selectPage);
    const size = yield select(selectSize);
    yield put(fetchUsers({pageSize: size, pageNumber: page}));
  } catch (err) {
    console.log('Error handleVerifiedUser: ', err);
  }
}

export function* handleFetchUserByExternalId({externalId}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_USER_BY_EXTERNAL_ID),
      Service: UsersServices,
      promise: (x) => x.fetchUserByExternalId(externalId),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchUserByExternalId: ', err);
  }
}

export default function* usersSagas() {
  yield all([
    takeLatest(actions.FETCH_USERS, handleFetchUsers),
    takeLatest(actions.FETCH_USERS_DELETED, handleFetchUsersDeleted),
    takeLatest(actions.FETCH_USER, handleFetchUser),
    takeLatest(actions.CREATE_USER, handleCreateUser),
    takeLatest(actions.DELETE_USER, handleDeleteUser),
    takeLatest(actions.EDIT_USER, handleEditUser),
    takeLatest(actions.SET_PICTURE, handleSetPicture),
    takeLatest(actions.FETCH_PICTURE, handleFetchPicture),
    takeLatest(actions.BANNED_USER, handleBannedUser),
    takeLatest(actions.VERIFIED_USER, handleVerifiedUser),
    takeLatest(actions.FETCH_USER_BY_EXTERNAL_ID, handleFetchUserByExternalId),
  ]);
}
