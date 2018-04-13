// @flow

import { Types, Creators } from '../actions';
import api from '../api';

const Api = new api;
const REFRESH_RATE = 30000;

export async function initAPI ( { action, dispatch }) {
  dispatch( Creators.APIGetAssets() );
  setInterval( () => {
    dispatch( Creators.APIRefreshAssets() );
  }, REFRESH_RATE );
}

export async function fetchAssets ( { action, dispatch, getState } ) {
  Api.getAssets( getState().app.activeDomain ).then( resp => {
      if ( resp.data ) {
        dispatch( Creators.AppReceiveAssetList( resp.data ) );
        dispatch( Creators.APIReceiveAssets() );
      } else {
        console.log( 'fetchAssets', resp );
      }
    }, err => console.log( err )
  );
}

export async function startTest ( { action, dispatch } ) {
  Api.startTest( action.asset.test_id, action.resolution, action.persona, action.pathAssertions ).then( resp => {
      if ( resp.data ) {
        dispatch( Creators.AppSetTestActive( action.asset.test_id ) );
        dispatch( Creators.AppLastResponse( resp.data ) );
      } else {
        dispatch( Creators.AppLastResponse( resp.data ) );
      }
    },
    err => console.log( err )
  );
}

export async function APIReceiveTestError ( { action, dispatch } ) {
  console.log('WHAT DO YOU MEAN WE`RE NOT RECEIVING ERRORS?');
}

export async function GetAsset ( { action, dispatch } ) {
  dispatch( Creators.AppSetActiveAssetLoading( true ) );
  const resp = await Api.getAsset( action.assetId);
  dispatch( Creators.AppReceiveActiveAsset( resp.data ) );
  dispatch( Creators.AppSetActiveAssetLoading( false ) );
}

export async function AddAsset ( { action, dispatch } ) {
  const resp = await Api.addAsset( action.asset );
  if ( resp.data.err ) {
    const formattedResp = {
      success: false,
      response: 'API error adding asset'
    };
    dispatch( Creators.AppLastResponse( formattedResp ) );
  } else {
    dispatch( Creators.AppLastResponse( resp.data ) );
  }
}

export async function UpdateAsset ( { action, dispatch } ) {
  const resp = await Api.updateAsset( action.asset );
  if ( resp.data.err ) {
    const formattedResp = {
      success: false,
      response: 'API error updating asset'
    };
    dispatch( Creators.AppLastResponse( formattedResp ) );
  } else {
    dispatch( Creators.AppLastResponse( resp.data ) );
  }
}

export async function DeleteAsset ( { action, dispatch } ) {
  const resp = await Api.deleteAsset( action.assetId );
  if ( resp.data.err ) {
    const formattedResp = {
      success: false,
      response: 'API error deleting asset'
    };
    dispatch( Creators.AppLastResponse( formattedResp ) );
  } else {
    dispatch( Creators.AppLastResponse( resp.data ) );
  }
  dispatch( Creators.APIGetAssets() );
}

export async function AddPersona ( { action, dispatch, getState } ) {
  const resp = await Api.addPersona( action.persona, action.assetId );
  if ( resp.data.err ) {
    const formattedResp = {
      success: false,
      response: 'API error adding persona'
    };
    dispatch( Creators.AppLastResponse( formattedResp ) );
  } else {
    dispatch( Creators.AppLastResponse( resp.data ) );
  }
  dispatch( Creators.APIGetAssetById( getState().app.activeAssetID ) );
}

export async function UpdatePersona ( { action, dispatch, getState } ) {
  const resp = await Api.updatePersona( action.persona );
  if ( resp.data.err ) {
    const formattedResp = {
      success: false,
      response: 'API error updating persona'
    };
    dispatch( Creators.AppLastResponse( formattedResp ) );
  } else {
    dispatch( Creators.AppLastResponse( resp.data ) );
  }
  dispatch( Creators.APIGetAssetById( getState().app.activeAssetID ) );
}

export async function DeletePersona ( { action, dispatch, getState } ) {
  const resp = await Api.deletePersona( action.personaId );

  if ( resp.data.err ) {
    const formattedResp = {
      success: false,
      response: 'API error deleting persona'
    };
    dispatch( Creators.AppLastResponse( formattedResp ) );
  } else {
    dispatch( Creators.AppLastResponse( resp.data ) );
  }
  dispatch( Creators.APIGetAssetById( getState().app.activeAssetID ) );
}

export default [
  { action: Types.API_INIT, effect: initAPI },
  { action: Types.API_GET_ASSETS, effect: fetchAssets },
  { action: Types.API_REFRESH_ASSETS, effect: fetchAssets },
  { action: Types.API_START_TEST, effect: startTest },
  { action: Types.API_RECEIVE_TEST_ERROR, effect: APIReceiveTestError },
  { action: Types.API_GET_ASSET, effect: GetAsset },
  { action: Types.API_ADD_ASSET, effect: AddAsset },
  { action: Types.API_UPDATE_ASSET, effect: UpdateAsset },
  { action: Types.API_DELETE_ASSET, effect: DeleteAsset },
  { action: Types.API_ADD_PERSONA, effect: AddPersona },
  { action: Types.API_UPDATE_PERSONA, effect: UpdatePersona },
  { action: Types.API_DELETE_PERSONA, effect: DeletePersona }
];