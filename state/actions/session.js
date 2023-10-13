import BaseActions from './base';

export const actions = new BaseActions(
  'session',
  ['INITIALIZE', 'SET_TOKEN', 'SET_USER_ID', 'LOG_OUT'],
  [],
);
export const initialize = () => ({type: actions.INITIALIZE});
export const setToken = (token) => ({type: actions.SET_TOKEN, token});
export const setUserId = (sub) => ({type: actions.SET_USER_ID, sub});
export const logOut = () => ({type: actions.LOG_OUT});
