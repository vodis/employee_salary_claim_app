import { USER_ACTION_TYPES } from './user-types';
import { createAction } from '../reducer-utils';

export const setAddress = (address) => createAction(USER_ACTION_TYPES.SET_ADDRESS, address);
export const setMethod = (method) => createAction(USER_ACTION_TYPES.SET_METHOD, method);
