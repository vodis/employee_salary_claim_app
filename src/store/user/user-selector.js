import { createSelector } from 'reselect';

export const selectUserReducer = (state) => state.user;

export const selectUserAddress = createSelector(selectUserReducer, (user) => user.address);

export const selectMethod = createSelector(selectUserReducer, (user) => user.method);
