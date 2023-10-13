import {call, put} from 'redux-saga/effects';
import TokenService from '../../services/token';
import {SessionServices} from '../../services';

function* task({promise, types, Service, ...rest}) {
  const [REQUEST, SUCCESS, FAILURE] = types;

  yield put({...rest, type: REQUEST});

  try {
    let result;
    if (Service) {
      const token = yield call(new SessionServices().getSessionFromCookies);
      const service = new Service(new TokenService(token));
      result = yield call(promise, service);
    } else {
      result = yield call(promise);
    }

    yield put({
      ...rest,
      result,
      type: SUCCESS,
      receivedAt: new Date(),
    });

    return result;
  } catch (err) {
    yield put({...rest, receivedAt: new Date(), err, type: FAILURE});
    console.log('fetch helper error: ', err);
    throw err;
  }
}

export default task;
