import { all, put, call, takeLatest } from 'redux-saga/effects';
import { fetchReferrals, fetchTime } from '../../utils/ethereum/ethereumFunctions';
import { REFERRALS_ACTION_TYPES } from './referrals-types';
import {
  fetchReferralsFailed,
  fetchReferralsSuccess,
  fetchTimeFailed,
  fetchTimeSuccess
} from './referrals-actions';
import { setCache, getCache, CACHE_KEYS } from '../../utils/cacheManager';

export function* fetchTimeAsync() {
  try {
    const time = yield call(fetchTime);
    yield put(fetchTimeSuccess(time));
  } catch (error) {
    yield put(fetchTimeFailed(error));
  }
}

export function* fetchReferralsAsync() {
  try {
    const referralsArrCashed = getCache(CACHE_KEYS.referrals);
    if (!referralsArrCashed) {
      const referralsArr = yield call(fetchReferrals);
      setCache(CACHE_KEYS.referrals, referralsArr);
      return yield put(fetchReferralsSuccess(referralsArr));
    }
    yield put(fetchReferralsSuccess(referralsArrCashed));
  } catch (error) {
    console.log(error.toString());
    yield put(fetchReferralsFailed(error));
  }
}

export function* onFetchTime() {
  yield takeLatest(REFERRALS_ACTION_TYPES.SET_TIME_START, fetchTimeAsync);
}

export function* onFetchReferrals() {
  yield takeLatest(REFERRALS_ACTION_TYPES.FETCH_REFERRALS_START, fetchReferralsAsync);
}

export function* referralsSaga() {
  yield all([call(onFetchTime), call(onFetchReferrals)]);
}
