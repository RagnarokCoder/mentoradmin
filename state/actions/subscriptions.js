import BaseActions from './base';

export const actions = new BaseActions(
  'subscriptions',
  ['CHANGE_PAGE', 'CHANGE_SIZE'],
  ['FETCH', 'FETCH_ID', 'CREATE', 'UPDATE', 'DELETE', 'ADD_PICTURE', 'ORDER'],
);

export const fetch = (query) => ({type: actions.FETCH, query});

export const fetchById = (id) => ({type: actions.FETCH_ID, id});

export const create = (params) => ({type: actions.CREATE, params});

export const update = (id, params) => ({type: actions.UPDATE, id, params});

export const deleted = (id) => ({type: actions.DELETE, id});

export const addPicture = (id, params) => ({
  type: actions.ADD_PICTURE,
  id,
  params,
});

export const order = (params) => ({type: actions.ORDER, params});
export const changePage = (page) => ({
  type: actions.CHANGE_PAGE,
  page,
});
export const changeSize = (size) => ({
  type: actions.CHANGE_SIZE,
  size,
});
