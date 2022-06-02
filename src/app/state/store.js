import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import browserUtils from './slices/browserUtils';
import data from './slices/data';

const reducer = combineReducers({
  browserUtils,
  data,
});

const store = configureStore({
  reducer,
});

export default store;
