import { createAction } from '../reducer-utils';
import { REFERRALS_ACTION_TYPES } from './referrals-types';

export const fetchReferralsStart = () => createAction(REFERRALS_ACTION_TYPES.FETCH_REFERRALS_START);

export const fetchReferralsSuccess = (referralsArray) =>
  createAction(REFERRALS_ACTION_TYPES.FETCH_REFERRALS_SUCCESS, referralsArray);

export const fetchReferralsFailed = (error) =>
  createAction(REFERRALS_ACTION_TYPES.FETCH_REFERRALS_FAILED, error);

export const fetchTimeStart = (isLoading) =>
  createAction(REFERRALS_ACTION_TYPES.SET_TIME_START, isLoading);

export const fetchTimeSuccess = (time) => {
  return createAction(REFERRALS_ACTION_TYPES.SET_TIME_SUCCESS, time);
};

export const fetchTimeFailed = (error) =>
  createAction(REFERRALS_ACTION_TYPES.SET_TIME_FAILED, error);

export const setSortType = (type) => createAction(REFERRALS_ACTION_TYPES.SET_SORT_TYPE, type);

export const setSortMy = (isMy) => createAction(REFERRALS_ACTION_TYPES.SET_SORT_MY, isMy);
export const setHideZero = (isHZ) => createAction(REFERRALS_ACTION_TYPES.SET_HIDE_ZERO, isHZ);
