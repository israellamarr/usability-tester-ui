// @flow

import { Types }                                     from '../actions';
import type { Asset, Persona, StatusMessage } from 'app/types';
import { TRAVIS_REFRESH_INTERVAL_MS }                from 'app/constants';

export type BreakPoint = 'x-sm' | 'sm' | 'md' | 'lg' | 'x-lg';

export type AppState = {
  userAuthorized: boolean,
  activeDomain: string,
  assets: Array<Asset>,
  activeTestID: string,
  activeAsset: Asset,
  activeEditingPersona: Persona,
  fetchingViewAsset: boolean,
  statusMessage: StatusMessage,
  clientWidth: BreakPoint,
  navTitle: string,
  navOpen: boolean,
  sideNavOpen: boolean
}

const INITIAL_STATE = {
  userAuthorized: false,
  activeDomain: 'all',
  assets: [],
  activeAsset: null,
  activeTestID: '',
  activeEditingPersona: null,
  activeAssetLoading: false,
  clientWidth: 'lg',
  statusMessage: {
    success: false,
    response: null
  },
  navTitle: 'Nav title',
  navOpen: true,
  sideNavOpen: false
};

const app = ( state: AppState = INITIAL_STATE, action) => {
  switch ( action.type ) {
    case Types.APP_RECEIVE_ASSET_LIST:
      return {
        ...state,
        assets: action.assets
      };
    case Types.APP_SET_ACTIVE_VIEW_DOMAIN:
      return {
        ...state,
        activeDomain: action.domain,

      };
    case Types.APP_RECEIVE_ACTIVE_TESTS:
      return {
        ...state,
        assets: state.assets.slice().map( asset => {
          if ( asset.testRunning && asset.triggeredLocally &&
            new Date().getTime() - asset.startedAt < TRAVIS_REFRESH_INTERVAL_MS) {
            return asset;
          } else {
            return {
              ...asset,
              testRunning: action.activeTests.indexOf( asset.testID ) !== -1
            };
          }
        })
      };
    case Types.APP_SET_NAV_OPEN:
      return {
        ...state,
        navOpen: action.navOpen
      };
    case Types.APP_SET_SIDE_NAV_OPEN:
      return {
        ...state,
        sideNavOpen: action.navOpen
      };
    case Types.APP_SET_NAV_TITLE:
      return {
        ...state,
        navTitle: action.navTitle
      };
    case Types.APP_SET_TEST_ACTIVE:
      return {
        ...state,
        assets: state.assets.slice().map( asset => {
          if ( asset.test_id === action.activeTest ) {
            return {
              ...asset,
              active_builds: [ { fix: 'me' } ]
            };
          } else {
            return asset;
          }
        } )
      };
    case Types.APP_SET_ACTIVE_ASSET_ID:
      return {
        ...state,
        activeAssetID: action.activeAssetID
      };
    case Types.APP_RECEIVE_ACTIVE_ASSET:
      return {
        ...state,
        activeAsset: action.activeAsset
      };
    case Types.APP_SET_ACTIVE_ASSET_LOADING:
      return {
        ...state,
        activeAssetLoading: action.activeAssetLoading
      };
    case Types.APP_SET_ACTIVE_EDITING_PERSONA:
      return {
        ...state,
        activeEditingPersona: action.activeEditingPersona
      };
    case Types.APP_LAST_RESPONSE:
      return {
        ...state,
        statusMessage: action.statusMessage
      };
    case Types.APP_SET_CLIENT_SIZE:
      return {
        ...state,
        clientSize: action.clientSize
      };
    case Types.APP_AUTHORIZE_USER:
      return {
        ...state,
        userAuthorized: action.userAuthorization
      };
    default:
      return state;
  }
};

export default app;