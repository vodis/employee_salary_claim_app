import { createSelector } from 'reselect';

export const selectThemeReducer = (state) => state.theme;

export const selectTheme = createSelector(selectThemeReducer, (user) => user.theme);
