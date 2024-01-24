import { THEME_ACTION_TYPES } from './theme-types';
import { createAction } from '../reducer-utils';

export const setTheme = (theme) => createAction(THEME_ACTION_TYPES.SET_THEME, theme);
