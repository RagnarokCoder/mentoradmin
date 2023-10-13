import {all, call, put, select, take, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions, fetch, fetchByUser, setPicture} from '../actions/post';
import {actions as actionsUser, fetchUsers, bannedUser} from '../actions/users';
import {selectUser, selectUsers} from '../selectors/users';
import {
  selectPagePageAll,
  selectPagePageUser,
  selectPageSizeAll,
  selectPageSizeUser,
} from '../selectors/post';
import {PostService} from '../../services';
import {defaultParams} from '../../utils/constants';

export function* handleFetchPost({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: PostService,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchPost: ', err);
  }
}

export function* handleFetchMorePost({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_MORE_POST),
      Service: PostService,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchMorePost: ', err);
  }
}

export function* handleFetchPostByUser({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_BY_USER),
      Service: PostService,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchPostByUser: ', err);
  }
}

export function* handleFetchMorePostPostByUser({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_MORE_POST_BY_USER),
      Service: PostService,
      promise: (x) => x.fetch({...defaultParams, ...params}),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchMorePostPostByUser: ', err);
  }
}

export function* handleFetchPostById({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_BY_ID),
      Service: PostService,
      promise: (x) => x.fetchById(id),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchPostById: ', err);
  }
}

export function* handleAddLike({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.ADD_LIKE),
      Service: PostService,
      promise: (x) => x.addLike(id, params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleAddLike: ', err);
  }
}

export function* handleRemoveLike({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.REMOVE_LIKE),
      Service: PostService,
      promise: (x) => x.removeLike(id, params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleRemoveLike: ', err);
  }
}

export function* handlePostCreate({params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.CREATE),
      Service: PostService,
      promise: (x) => x.create(params),
    };
    const response = yield call(task, action);
    if (params.picture) {
      yield put(setPicture(params.picture, response.id));
      yield take([actions.SET_PICTURE_SUCCESS, actions.SET_PICTURE_FAILED]);
    }
    const pagePageAll = yield select(selectPagePageAll);
    const pagePageUser = yield select(selectPagePageUser);
    const pageSizeAll = yield select(selectPageSizeAll);
    const pageSizeUser = yield select(selectPageSizeUser);
    yield put(fetch({pageSize: pageSizeAll, pageNumber: pagePageAll}));
    const user = yield select(selectUser);
    yield put(
      fetchByUser({
        userId: user.id,
        pageSize: pageSizeUser,
        pageNumber: pagePageUser,
      }),
    );
  } catch (err) {
    console.log('Error handlePostCreate: ', err);
  }
}

export function* handlePostRemove({id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.REMOVE),
      Service: PostService,
      promise: (x) => x.delete(id),
    };
    yield call(task, action);
    const pagePageAll = yield select(selectPagePageAll);
    const pagePageUser = yield select(selectPagePageUser);
    const pageSizeAll = yield select(selectPageSizeAll);
    const pageSizeUser = yield select(selectPageSizeUser);
    yield put(fetch({pageSize: pageSizeAll, pageNumber: pagePageAll}));
    const user = yield select(selectUser);
    yield put(
      fetchByUser({
        userId: user.id,
        pageSize: pageSizeUser,
        pageNumber: pagePageUser,
      }),
    );
  } catch (err) {
    console.log('Error handlePostRemove: ', err);
  }
}

export function* handleSetPicture({picture, id}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.SET_PICTURE),
      Service: PostService,
      promise: (x) => x.addPicture(picture, id),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleSetPicture: ', err);
  }
}

export function* handleBannedUser({id}) {
  try {
    yield put(fetchUsers({id}));
    yield take([
      actionsUser.FETCH_USERS_SUCCESS,
      actionsUser.FETCH_USERS_FAILED,
    ]);
    const users = yield select(selectUsers);
    if (users?.data.length > 0) {
      const _user = users?.data[0];
      yield put(bannedUser(_user.id, {banned: true}));
      yield take([actionsUser.EDIT_USER_SUCCESS, actionsUser.EDIT_USER_FAILED]);
      const pagePageAll = yield select(selectPagePageAll);
      const pagePageUser = yield select(selectPagePageUser);
      const pageSizeAll = yield select(selectPageSizeAll);
      const pageSizeUser = yield select(selectPageSizeUser);
      yield put(fetch({pageSize: pageSizeAll, pageNumber: pagePageAll}));
      const user = yield select(selectUser);
      yield put(
        fetchByUser({
          userId: user.id,
          pageSize: pageSizeUser,
          pageNumber: pagePageUser,
        }),
      );
    }
  } catch (err) {
    console.log('Error handleBannedUser: ', err);
  }
}

export function* handleNotify({id, params}) {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.NOTIFY),
      Service: PostService,
      promise: (x) => x.notify(id, params),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleNotify: ', err);
  }
}

export default function* postSagas() {
  yield all([
    takeLatest(actions.FETCH, handleFetchPost),
    takeLatest(actions.FETCH_MORE_POST, handleFetchMorePost),
    takeLatest(actions.FETCH_BY_USER, handleFetchPostByUser),
    takeLatest(actions.FETCH_MORE_POST_BY_USER, handleFetchMorePostPostByUser),
    takeLatest(actions.CREATE, handlePostCreate),
    takeLatest(actions.SET_PICTURE, handleSetPicture),
    takeLatest(actions.REMOVE, handlePostRemove),
    takeLatest(actions.FETCH_BY_ID, handleFetchPostById),
    takeLatest(actions.ADD_LIKE, handleAddLike),
    takeLatest(actions.REMOVE_LIKE, handleRemoveLike),
    takeLatest(actions.BANNED_USER, handleBannedUser),
    takeLatest(actions.NOTIFY, handleNotify),
  ]);
}
