import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import todoApp from './reducers';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  todoApp,
  applyMiddleware(sagaMiddleware),
);

window.store = store;
export default store;

mySaga.forEach(saga => sagaMiddleware.run(saga));
