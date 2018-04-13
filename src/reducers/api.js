// @flow

import { Types }                from '../actions';
import { Asset, BusinessLine }  from '../types';

export type APIState = {
  authorized: boolean,
  error: Object,
  fetchingAssets: boolean,
  refreshing: boolean
}

const INITIAL_STATE = {
  authorized: false,
  error: {},
  fetchingAssets: false,
  refreshing: false
};

const api = ( state: APIState = INITIAL_STATE, action) => {
  switch ( action.type ) {
    case Types.API_AUTHORIZE:
      return {
        ...state,
        authorized: true
      };
    case Types.API_GET_ASSETS:
      return {
        ...state,
        fetchingAssets: true
      };
    case Types.API_REFRESH_ASSETS:
      return {
        ...state,
        refreshingAssets: true
      };
    case Types.API_RECEIVE_ASSETS:
      return {
        ...state,
        assets: action.assets,
        fetchingAssets: false,
        refreshingAssets: false,
      };
    case Types.API_START_TEST:
      return {
        ...state
      };
    case Types.API_RECEIVE_TEST_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default api;