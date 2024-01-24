import { USER_ACTION_TYPES } from './user-types';

const INITIAL_STATE = {
  currentUser: {
    signer: null,
    provider: null
  },
  error: null,
  isLoading: false
};

export const providerAndSigner = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_OUT_START:
      return { ...state, currentUser: { signer: null, provider: null } };
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload, isLoading: false };

    default:
      return state;
  }
};
