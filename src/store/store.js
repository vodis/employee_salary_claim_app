import { compose, createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['referrals', 'user', 'theme']
};

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare].filter(
  Boolean
);

const composeEnchanser =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhansers = composeEnchanser(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhansers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
