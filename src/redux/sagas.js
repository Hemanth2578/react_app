import { put, take, select, takeEvery } from 'redux-saga/effects';
import { TEST_ACTION, testActionForSaga } from './reducers';

function* testSaga() {
  const action = yield take([TEST_ACTION]);
  const val1 = yield select((state) => state.value);
  yield put(testActionForSaga());
  const val2 = yield select((state) => state.value);
  console.log('inside sags ', val1, val2);
}

function* logger() {
  while (1) {
    const action = yield take('*');
    console.log(action);
  }
}

function* onAsyncSubscribe(action) {
  const [start, success, error] = action.actions;
  const promise = action.promise;

  yield put({ type: start });

  try {
    const result = yield promise;
    yield put({ type: success, payload: result });
  } catch (e) {
    yield put({ type: error, error: e });
  }
}

function* asyncSaga() {
  yield takeEvery('async', onAsyncSubscribe);
}

export default [
  testSaga,
  logger,
  asyncSaga,
];