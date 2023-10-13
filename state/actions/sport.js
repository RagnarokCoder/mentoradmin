import BaseActions from './base';

export const actions = new BaseActions('sport', [], ['FETCH']);

export const fetch = () => ({type: actions.FETCH});
