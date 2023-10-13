import BaseActions from './base';

export const actions = new BaseActions(
  'team',
  ['CHANGE_PAGE', 'CHANGE_SIZE'],
  ['FETCH', 'FETCH_ID', 'CREATE', 'UPDATE', 'DELETE', 'ADD_PICTURE'],
);

export const fetch = (params) => ({type: actions.FETCH, params});

export const fetchById = (id) => ({type: actions.FETCH_ID, id});

export const create = (params) => ({type: actions.CREATE, params});

export const update = (id, params) => ({type: actions.UPDATE, id, params});

export const deleted = (id) => ({type: actions.DELETE, id});

export const addPicture = (id, params) => ({
  type: actions.ADD_PICTURE,
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
