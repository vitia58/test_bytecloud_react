import { all } from 'redux-saga/effects';
import { profileWatcher } from './main';

function* rootSaga() {
  yield all([profileWatcher()]);
}

export default rootSaga;
