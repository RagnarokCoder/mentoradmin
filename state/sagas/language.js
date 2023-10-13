import {all, call, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions} from '../actions/language';
import {LanguageServices} from '../../services';

export function* handleFetchLanguages() {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH_LANGUAGES),
      Service: LanguageServices,
      promise: (x) => x.fetchLanguages(),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetchLanguages: ', err);
  }
}

export default function* languageSagas() {
  yield all([takeLatest(actions.FETCH_LANGUAGES, handleFetchLanguages)]);
}
