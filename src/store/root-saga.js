import { all, call } from 'redux-saga/effects';
import { referralsSaga } from './referrals/referrals-saga';

export function* rootSaga() {
  yield all([call(referralsSaga)]);
}
