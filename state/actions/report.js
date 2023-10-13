import BaseActions from './base';

export const actions = new BaseActions(
  'report',
  [
    'CHANGE_PAGE_RESOLVED',
    'CHANGE_PAGE_NO_RESOLVED',
    'CHANGE_SIZE_RESOLVED',
    'CHANGE_SIZE_NO_RESOLVED',
  ],
  ['FETCH_RESOLVED', 'FETCH_NO_RESOLVED', 'FETCH_BY_ID', 'CREATE', 'EDIT'],
);

export const fetchResolved = (params) => ({
  type: actions.FETCH_RESOLVED,
  params,
});
export const fetchNoResolved = (params) => ({
  type: actions.FETCH_NO_RESOLVED,
  params,
});
export const fetchById = (id) => ({type: actions.FETCH_BY_ID, id});
export const create = (params) => ({type: actions.CREATE, params});
export const edit = (id, params) => ({type: actions.EDIT, id, params});
export const changePageResolved = (page) => ({
  type: actions.CHANGE_PAGE_RESOLVED,
  page,
});
export const changeSizeResolved = (size) => ({
  type: actions.CHANGE_SIZE_RESOLVED,
  size,
});
export const changePageNoResolved = (page) => ({
  type: actions.CHANGE_PAGE_NO_RESOLVED,
  page,
});
export const changeSizeNoResolved = (size) => ({
  type: actions.CHANGE_SIZE_NO_RESOLVED,
  size,
});
