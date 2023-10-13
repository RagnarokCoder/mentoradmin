import BaseActions from './base';

export const actions = new BaseActions('language', [], ['FETCH_LANGUAGES']);

export const fetchLanguages = () => ({type: actions.FETCH_LANGUAGES});
