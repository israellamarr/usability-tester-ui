// @flow

import app from './app';
import api from './api';
import settings from './settings';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage/index';

const config = {
  key: 'appData',
  version: 1,
  whitelist: [ 'settings' ],
  storage,
};

const persistRoot = persistCombineReducers(config, {
  app,
  api,
  settings
});

export default persistRoot;