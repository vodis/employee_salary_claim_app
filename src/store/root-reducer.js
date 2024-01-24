import { combineReducers } from 'redux';
import { userReducer } from './user/user-reducer';
import { referralsReducer } from './referrals/referrals-reducer';
import { providerAndSigner } from './providerAndSigner/user-reducer';
import { themeReducer } from './theme/theme-reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  referrals: referralsReducer,
  providerAndSigner,
  theme: themeReducer
});
