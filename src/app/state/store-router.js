/* eslint-disable no-shadow */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import browserUtils from './slices/browserUtils';
import data from './slices/data';

export const history = createBrowserHistory();

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    browserUtils,
    data,
  });

const store = configureStore({
  reducer: rootReducer(history),
  middleware: [thunk, routerMiddleware(history)],
});

export default store;
