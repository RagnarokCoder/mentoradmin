import BaseActions from './base';

export const actions = new BaseActions('country', [], ['FETCH_COUNTRIES']);

export const fetchCountries = () => ({type: actions.FETCH_COUNTRIES});
