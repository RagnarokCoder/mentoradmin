import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createWrapper} from 'next-redux-wrapper';

import rootReducer from './reducers';
import watchRoot from './sagas';
import {logger} from './helpers';

export const buildStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, logger),
  );

  store.sagaTask = sagaMiddleware.run(watchRoot);
  return store;
};

export const wrapper = createWrapper(buildStore, {
  debug: process.env.NODE_ENV !== 'production',
});
