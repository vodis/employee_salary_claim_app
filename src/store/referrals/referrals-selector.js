import { createSelector } from 'reselect';

export const selectReferralsReducer = (state) => state.referrals;

export const selectTime = createSelector(selectReferralsReducer, (referrals) => referrals.time);

export const selectisReferralsLoading = createSelector(
  selectReferralsReducer,
  (referrals) => referrals.isLoading
);

export const selectReferrals = createSelector(
  selectReferralsReducer,
  (referrals) => referrals.referrals
);

export const selectSortType = createSelector(
  selectReferralsReducer,
  (referrals) => referrals.sortType
);

export const selectSortMy = createSelector(selectReferralsReducer, (referrals) => referrals.sortMy);

export const selectHideZero = createSelector(
  selectReferralsReducer,
  (referrals) => referrals.hideZero
);
