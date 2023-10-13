import BaseActions from './base';

export const actions = new BaseActions(
  'usersubscriptionreport',
  ['SET_DEFAULT_STATE'],
  ['FETCH'],
);

export const setDefaultState = () => ({type: actions.SET_DEFAULT_STATE});
export const fetch = () => ({type: actions.FETCH});
