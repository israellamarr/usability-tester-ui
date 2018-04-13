// @flow

import { Types, Creators }              from '../actions';
import { TRAVIS_REFRESH_INTERVAL_MS }   from 'app/constants';
import { UpdateAsset }                  from 'app/effects/api';
import { AppGetPersonaFromActiveAsset } from 'app/actions';

function azureLogin ( { action, dispatch } ) {
  if ( action.email && action.password ) {
    dispatch( Creators.AppAuthorizeUser( true ) );
  } else {
    let resp = {
      success: false,
      response: 'User not found.'
    };
    dispatch( Creators.AppLastResponse( resp ) );
  }
}

function isUserAuthed ( { action, dispatch } ) {
  if ( localStorage ) {
    const token = localStorage.getItem( 'tr_auth_token' );

    if ( ! token ) {
      const hash = 'asdf';
      localStorage.setItem( 'tr_auth_token', hash );
    }
  }
}

function onDomainChange ( { action, dispatch} ) {
  dispatch( Creators.APIGetAssets() );
}

function activeAssetIDChanged ( { action, dispatch, getState } ) {
  let resp = {
    success: false,
    response: ''
  };
  dispatch( Creators.AppLastResponse( resp ) );
  dispatch( Creators.APIGetAssetById( getState().app.activeAssetID ) );
}

function setPersonaFromActiveAsset ( { action, dispatch, getState } ) {
  const activePersona = getState().app.activeAsset.personas.find( persona => {
    return persona.persona_id === action.personaId;
  } );
  dispatch( Creators.AppSetActiveEditingPersona( activePersona ) );
}

export default [
  { action: Types.AZURE_LOGIN, effect: azureLogin },
  { action: Types.APP_IS_USER_AUTHORIZED, effect: isUserAuthed },
  { action: Types.APP_SET_ACTIVE_VIEW_DOMAIN, effect: onDomainChange },
  { action: Types.APP_SET_ACTIVE_ASSET_ID, effect: activeAssetIDChanged },
  { action: Types.APP_GET_PERSONA_FROM_ACTIVE_ASSET, effect: setPersonaFromActiveAsset }
];
