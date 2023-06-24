import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducer';
import rootSaga from './saga';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './types';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
    blacklist: ['main'],
    timeout: 0,
  },
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
