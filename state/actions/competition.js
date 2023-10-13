import BaseActions from './base';

export const actions = new BaseActions(
  'competition',
  ['INITIALIZE', 'CLEAR_COMPETITION', 'CHANGE_PAGE', 'CHANGE_SIZE'],
  ['FETCH', 'FETCH_ID', 'CREATE', 'UPDATE', 'REMOVE'],
);

export const clearCompetition = () => ({type: actions.CLEAR_COMPETITION});

export const initialize = () => ({type: actions.INITIALIZE});

export const fetch = (params) => ({type: actions.FETCH, params});

export const fetchById = (id) => ({type: actions.FETCH_ID, id});

export const create = (params) => ({type: actions.CREATE, params});

export const update = (id, params) => ({type: actions.UPDATE, id, params});

export const remove = (id) => ({type: actions.REMOVE, id});

export const changePage = (page) => ({
  type: actions.CHANGE_PAGE,
  page,
});
export const changeSize = (size) => ({
  type: actions.CHANGE_SIZE,
  size,
});
