import {all, call, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions} from '../actions/country';
import {CountryServices} from '../../services';

export function* handleFetchCountries() {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_COUNTRIES),
      Service: CountryServices,
      promise: (x) => x.fetchCountries(),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchCountries: ', err);
  }
}

export default function* countrySagas() {
  yield all([takeLatest(actions.FETCH_COUNTRIES, handleFetchCountries)]);
}
