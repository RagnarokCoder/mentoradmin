import {all, call, takeLatest} from 'redux-saga/effects';
import {task} from '../helpers';
import {actions} from '../actions/sport';
import {SportServices} from '../../services';

export function* handleFetch() {
  try {
    const action = {
      types: actions.sideEffectsFor(actions.FETCH),
      Service: SportServices,
      promise: (x) => x.fetch(),
    };
    yield call(task, action);
  } catch (err) {
    console.log('Error handleFetch: ', err);
  }
}

export default function* sportSagas() {
  yield all([takeLatest(actions.FETCH, handleFetch)]);
}
