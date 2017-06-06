export const TEST_ACTION = 'lesson/reducer/TEST_ACTION';
export const TEST_ACTION2 = 'lesson/reducer/TEST_ACTION2';

const TEST_LOAD = 'lesson/reducer/TEST_LOAD';
const TEST_LOADED = 'lesson/reducer/TEST_LOADED';
const TEST_FAILED = 'lesson/reducer/TEST_FAILED';

function someAsyncApiCall(val) {
  return new Promise((res, rej) => {
    setTimeout(() => res(val), 3000);
  })
}

export default function reducer(state = { value: 'test', loading: false }, action) {
  if (action.type === TEST_ACTION) {
    return { ...state, value: action.value };
  }
  if (action.type === TEST_ACTION2) {
    return { ...state, value: 'saga works' };
  }

  if (action.type === TEST_LOAD) {
    return { ...state, loading: true };
  }

  if (action.type === TEST_LOADED) {
    return { ...state, loading: false, value: action.payload };
  }

  if (action.type === TEST_FAILED) {
    return { ...state, loading: false, value: action.error };
  }

  return state;
}

export function testActionCreator(value) {
  return {
    type: TEST_ACTION,
    value,
  }
}

export function testActionForSaga() {
  return {
    type: TEST_ACTION2,
  };
}

export function someAsyncAction(val) {
  return {
    actions: [TEST_LOAD, TEST_LOADED, TEST_FAILED],
    type: 'async',
    promise: someAsyncApiCall(val),
  };
}
