import BaseActions from './base';

export const actions = new BaseActions(
  'notifications',
  ['CHANGE_PAGE', 'CHANGE_SIZE'],
  ['FETCH', 'CREATE', 'CREATE_USER'],
);

export const fetchNotifications = (params) => ({type: actions.FETCH, params});

export const createNotifications = (body) => ({type: actions.CREATE, body});

export const createUserNotifications = (body) => ({
  type: actions.CREATE_USER,
  body,
});
export const changePage = (page) => ({
  type: actions.CHANGE_PAGE,
  page,
});
export const changeSize = (size) => ({
  type: actions.CHANGE_SIZE,
  size,
});
