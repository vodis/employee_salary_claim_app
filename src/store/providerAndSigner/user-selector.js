import { createSelector } from 'reselect';

export const selectUserReducer = (state) => state.providerAndSigner;

export const selectCurrentUser = createSelector(selectUserReducer, (user) => user.currentUser);
