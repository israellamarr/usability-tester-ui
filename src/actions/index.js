// @flow

import type {
  Asset,
  Resolution,
  Persona,
  BusinessLine,
  SheetAssetData,
  StatusMessage
} from 'app/types';
import type { BreakPoint } from 'app/reducers/app';

export const Types = {
  APP_RECEIVE_ASSET_LIST: 'APP_RECEIVE_ASSET_LIST',
  APP_SET_ACTIVE_VIEW_DOMAIN: 'APP_SET_ACTIVE_VIEW_DOMAIN',
  APP_RECEIVE_ACTIVE_TESTS: 'APP_RECEIVE_ACTIVE_TESTS',
  APP_SET_TEST_ACTIVE: 'APP_SET_TEST_ACTIVE',
  APP_SET_ACTIVE_ASSET_ID: 'APP_SET_ACTIVE_ASSET_ID',         // Set the ID of the active test
  APP_RECEIVE_ACTIVE_ASSET: 'APP_RECEIVE_ACTIVE_ASSET',       // Load result of async call to fetch asset by testID
  APP_SET_ACTIVE_ASSET_LOADING: 'APP_SET_ACTIVE_ASSET_LOAD_LOADING',
  APP_LAST_RESPONSE: 'APP_LAST_RESPONSE',
  APP_SET_CLIENT_SIZE: 'APP_SET_CLIENT_SIZE',
  APP_SET_NAV_OPEN: 'APP_SET_NAV_OPEN',
  APP_SET_SIDE_NAV_OPEN: 'APP_SET_SIDE_NAV_OPEN',
  APP_SET_NAV_TITLE: 'APP_SET_NAV_TITLE',
  APP_GET_PERSONA_FROM_ACTIVE_ASSET: 'APP_GET_PERSONA_FROM_ACTIVE_ASSET',
  APP_SET_ACTIVE_EDITING_PERSONA: 'APP_SET_ACTIVE_EDITING_PERSONA',
  APP_AUTHORIZE_USER: 'APP_AUTHORIZE_USER',
  APP_IS_USER_AUTHORIZED: 'APP_IS_USER_AUTHORIZED',
  SETTINGS_TOGGLE_DARK_THEME: 'SETTINGS_TOGGLE_DARK_THEME',

  AZURE_LOGIN: 'AZURE_LOGIN',

  API_INIT: 'API_INIT',
  API_AUTHORIZE: 'API_AUTHORIZE',
  API_GET_ASSETS: 'API_GET_ASSETS',
  API_REFRESH_ASSETS: 'API_REFRESH_ASSETS',
  API_RECEIVE_ASSETS: 'API_RECEIVE_ASSETS',
  API_START_TEST: 'API_START_TEST',
  API_RECEIVE_TEST_ERROR: 'API_RECEIVE_TEST_ERROR',
  API_GET_ASSET: 'API_GET_ASSET',
  API_ADD_ASSET: 'API_ADD_ASSET',
  API_UPDATE_ASSET: 'API_UPDATE_ASSET',
  API_DELETE_ASSET: 'API_DELETE_ASSET',
  API_ADD_PERSONA: 'API_ADD_PERSONA',
  API_UPDATE_PERSONA: 'API_UPDATE_PERSONA',
  API_DELETE_PERSONA: 'API_DELETE_PERSONA'
};

export const AppSetClientSize = ( size: BreakPoint ) => {
  return {
    type: Types.APP_SET_CLIENT_SIZE,
    clientSize: size
  };
};

export const AppSetNavOpen = ( navOpen: boolean ) => {
  return {
    type: Types.APP_SET_NAV_OPEN,
    navOpen
  };
};

export const AppSetSideNavOpen = ( navOpen: boolean ) => {
  return {
    type: Types.APP_SET_SIDE_NAV_OPEN,
    navOpen
  };
};

export const AppSetNavTitle = ( navTitle: string ) => {
  return {
    type: Types.APP_SET_NAV_TITLE,
    navTitle
  };
};

export const AppReceiveAssetList = ( assets: Array<Asset> ) => {
  return {
    type: Types.APP_RECEIVE_ASSET_LIST,
    assets
  };
};

export const AppSetActiveViewDomain = ( domain: BusinessLine ) => {
  return {
    type: Types.APP_SET_ACTIVE_VIEW_DOMAIN,
    domain
  };
};

export const AppReceiveActiveTests = ( activeTests: Array<string> ) => {
  return {
    type: Types.APP_RECEIVE_ACTIVE_TESTS,
    activeTests
  };
};

export const AppSetTestActive = ( activeTest: string ) => {
  return {
    type: Types.APP_SET_TEST_ACTIVE,
    activeTest
  };
};

export const AppSetActiveAssetID = ( assetID: string ) => {
  return {
    type: Types.APP_SET_ACTIVE_ASSET_ID,
    activeAssetID: assetID
  };
};

export const AppReceiveActiveAsset = ( asset: Asset) => {
  return {
    type: Types.APP_RECEIVE_ACTIVE_ASSET,
    activeAsset: asset
  };
};

export const AppSetActiveAssetLoading = ( activeAssetLoading: boolean ) => {
  return {
    type: Types.APP_SET_ACTIVE_ASSET_LOADING,
    activeAssetLoading
  };
};

export const AppGetPersonaFromActiveAsset = ( personaId: string ) => {
  return {
    type: Types.APP_GET_PERSONA_FROM_ACTIVE_ASSET,
    personaId
  };
};

export const AppSetActiveEditingPersona = ( activeEditingPersona: Persona ) => {
  return {
    type: Types.APP_SET_ACTIVE_EDITING_PERSONA,
    activeEditingPersona
  };
};

export const AppLastResponse = ( statusMessage: StatusMessage ) => {
  return {
    type: Types.APP_LAST_RESPONSE,
    statusMessage
  };
};

export const AppAuthorizeUser = ( userAuthorization: boolean ) => {
  return {
    type: Types.APP_AUTHORIZE_USER,
    userAuthorization
  };
};

export const AppIsUserAuthorized = () => {
  return {
    type: Types.APP_IS_USER_AUTHORIZED
  };
};

export const SettingsToggleDarkTheme = () => {
  return {
    type: Types.SETTINGS_TOGGLE_DARK_THEME
  };
};

export const AzureLogin = ( email: string, password: string ) => {
  return {
    type: Types.AZURE_LOGIN,
    email,
    password
  };
};

export const APIInit = () => {
  return {
    type: Types.API_INIT
  };
};

export const APIAuthorize = () => {
  return {
    type: Types.API_AUTHORIZE
  };
};

export const APIGetAssets = () => {
  return {
    type: Types.API_GET_ASSETS,
  };
};

export const APIRefreshAssets = () => {
  return {
    type: Types.API_REFRESH_ASSETS,
  };
};

export const APIReceiveAssets = ( ) => {
  return {
    type: Types.API_RECEIVE_ASSETS
  };
};

export const APIStartTest = ( asset: Asset, resolution: Resolution, persona: Persona, pathAssertions: PathAssertions ) => {
  return {
    type: Types.API_START_TEST,
    asset,
    resolution,
    persona,
    pathAssertions
  };
};

export const APIReceiveTestError = ( error: Object ) => {
  return {
    type: Types.API_RECEIVE_TEST_ERROR,
    error
  };
};

export const APIGetAssetById = ( assetId: string ) => {
  return {
    type: Types.API_GET_ASSET,
    assetId
  };
};

export const APIAddAsset = ( asset: Asset ) => {
  return {
    type: Types.API_ADD_ASSET,
    asset
  };
};

export const APIUpdateAsset = ( asset: Asset ) => {
  return {
    type: Types.API_UPDATE_ASSET,
    asset
  };
};

export const APIDeleteAsset = ( assetId: string ) => {
  return {
    type: Types.API_DELETE_ASSET,
    assetId
  };
};

export const APIAddPersona = ( persona: Persona, assetId: string ) => {
  return {
    type: Types.API_ADD_PERSONA,
    persona,
    assetId
  };
};

export const APIUpdatePersona = ( persona: Persona ) => {
  return {
    type: Types.API_UPDATE_PERSONA,
    persona
  };
};

export const APIDeletePersona = ( personaId: string ) => {
  return {
    type: Types.API_DELETE_PERSONA,
    personaId
  };
};

export const Creators = {
  AppReceiveAssetList,
  AppSetActiveViewDomain,
  AppReceiveActiveTests,
  AppSetNavOpen,
  AppSetSideNavOpen,
  AppSetNavTitle,
  AppSetClientSize,
  AppSetTestActive,
  AppSetActiveAssetID,
  AppReceiveActiveAsset,
  AppSetActiveAssetLoading,
  AppGetPersonaFromActiveAsset,
  AppSetActiveEditingPersona,
  AppLastResponse,
  AppAuthorizeUser,
  AppIsUserAuthorized,

  SettingsToggleDarkTheme,

  AzureLogin,

  APIInit,
  APIAuthorize,
  APIGetAssets,
  APIRefreshAssets,
  APIReceiveAssets,
  APIStartTest,
  APIReceiveTestError,
  APIGetAssetById,
  APIAddAsset,
  APIUpdateAsset,
  APIDeleteAsset,
  APIAddPersona,
  APIUpdatePersona,
  APIDeletePersona
};