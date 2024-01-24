import { REFERRALS_ACTION_TYPES } from './referrals-types';

const INITIAL_STATE = {
  time: {
    bsc: null,
    polygon: null
  },
  referrals: {},
  sortType: 'Sort By',
  sortMy: false,
  hideZero: true,
  error: null,
  isLoading: false
};

export const referralsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case REFERRALS_ACTION_TYPES.SET_TIME:
      return { ...state, time: payload, isLoading: false };
    case REFERRALS_ACTION_TYPES.SET_TIME_LOADING:
      return { ...state, isLoading: payload };

    case REFERRALS_ACTION_TYPES.SET_TIME_START:
      return { ...state, isLoading: payload };
    case REFERRALS_ACTION_TYPES.SET_TIME_SUCCESS:
      return { ...state, time: payload };
    case REFERRALS_ACTION_TYPES.SET_TIME_FAILED:
      return { ...state, error: payload, isLoading: false };

    case REFERRALS_ACTION_TYPES.FETCH_REFERRALS_START:
      return { ...state, isLoading: true };
    case REFERRALS_ACTION_TYPES.FETCH_REFERRALS_SUCCESS:
      return { ...state, referrals: payload, isLoading: false };
    case REFERRALS_ACTION_TYPES.FETCH_REFERRALS_FAILED:
      return { ...state, error: payload, isLoading: false };

    case REFERRALS_ACTION_TYPES.SET_SORT_TYPE:
      return { ...state, sortType: payload };

    case REFERRALS_ACTION_TYPES.SET_SORT_MY:
      return { ...state, sortMy: payload };

    case REFERRALS_ACTION_TYPES.SET_HIDE_ZERO:
      return { ...state, hideZero: payload };

    default:
      return state;
  }
};
