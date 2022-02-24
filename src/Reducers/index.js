import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loadingReducer from './LoadingReducer';
import totalTableReducer from './TotalTableReducer';

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['authorisation'],
};

const reducers = combineReducers({
  loading: loadingReducer,
  totalTable: totalTableReducer,
});

const persistedReducers = persistReducer(persistConfig, reducers);

export default persistedReducers;
