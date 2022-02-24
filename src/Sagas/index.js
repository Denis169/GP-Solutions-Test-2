import { all, fork } from 'redux-saga/effects';
import watcherFetchOrderParty from './fetchOrderParty';

function* rootSaga() {
  yield all([
    fork(watcherFetchOrderParty),
  ]);
}

export default rootSaga;
