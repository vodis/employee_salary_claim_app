import { USER_ACTION_TYPES } from './user-types';

const INITIAL_STATE = {
  address: '',
  error: null,
  isLoading: false,
  method: ''
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_ADDRESS:
      return { ...state, address: payload };

    case USER_ACTION_TYPES.SET_METHOD:
      return { ...state, method: payload };

    default:
      return state;
  }
};
