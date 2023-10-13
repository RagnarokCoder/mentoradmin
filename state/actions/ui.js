import BaseActions from './base';

export const actions = new BaseActions('ui', ['CHANGE_ROUTE'], []);

export const changeRoute = (path) => ({type: actions.CHANGE_ROUTE, path});
