import BaseActions from './base';

export const actions = new BaseActions(
  'users',
  [
    'GET_ROLES',
    'SET_PERMISSIONS',
    'CHANGE_PAGE',
    'CHANGE_SIZE',
    'CHANGE_PAGE_DELETE',
    'CHANGE_SIZE_DELETE',
  ],
  [
    'FETCH_USERS',
    'FETCH_USERS_DELETED',
    'FETCH_USER',
    'FETCH_USER_BY_EXTERNAL_ID',
    'CREATE_USER',
    'DELETE_USER',
    'EDIT_USER',
    'SET_PICTURE',
    'FETCH_PICTURE',
    'BANNED_USER',
    'VERIFIED_USER',
  ],
);

export const fetchUsers = (params) => ({type: actions.FETCH_USERS, params});
export const fetchUserByExternalId = (externalId) => ({
  type: actions.FETCH_USER_BY_EXTERNAL_ID,
  externalId,
});
export const fetchUsersDeleted = (params) => ({
  type: actions.FETCH_USERS_DELETED,
  params,
});
export const fetchUser = () => ({type: actions.FETCH_USER});
export const createUser = (user) => ({type: actions.CREATE_USER, user});
export const deleteUser = (id, role) => ({type: actions.DELETE_USER, id, role});
export const editUser = (user) => ({type: actions.EDIT_USER, user});
export const setPicture = (picture, id) => ({
  type: actions.SET_PICTURE,
  picture,
  id,
});
export const fetchPicture = (id) => ({type: actions.FETCH_PICTURE, id});
export const setPermissions = (permissions) => ({
  type: actions.SET_PERMISSIONS,
  permissions,
});
export const bannedUser = (id, params) => ({
  type: actions.BANNED_USER,
  id,
  params,
});
export const verifiedUser = (id, params) => ({
  type: actions.VERIFIED_USER,
  id,
  params,
});
export const changePage = (page) => ({
  type: actions.CHANGE_PAGE,
  page,
});
export const changeSize = (size) => ({
  type: actions.CHANGE_SIZE,
  size,
});
export const changePageDeleted = (page) => ({
  type: actions.CHANGE_PAGE_DELETE,
  page,
});
export const changeSizeDeleted = (size) => ({
  type: actions.CHANGE_SIZE_DELETE,
  size,
});
