import BaseActions from './base';

export const actions = new BaseActions(
  'admin',
  ['SET_CREATE_USER_STATUS'],
  ['FETCH', 'CREATE_USER', 'CREATE_ROLE', 'DELETE_ROLE', 'FETCH_ROLE', 'GIVE'],
);

export const fetch = (params) => ({type: actions.FETCH, params});
export const createUser = (body, role) => ({
  type: actions.CREATE_USER,
  body,
  role,
});
export const createRole = (id, body) => ({type: actions.CREATE_ROLE, id, body});
export const deleteRole = (id) => ({type: actions.DELETE_ROLE, id});
export const fetchRole = (id, params) => ({
  type: actions.FETCH_ROLE,
  id,
  params,
});
export const setCreateUserStatus = () => ({
  type: actions.SET_CREATE_USER_STATUS,
});

export const give = (id, params) => ({
  type: actions.GIVE,
  id,
  params,
});
