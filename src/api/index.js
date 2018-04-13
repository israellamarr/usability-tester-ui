// @flow
import { create }            from 'apisauce';
import type { BusinessLine, Asset, Persona, PathAssertions, Resolution } from '../types';

const env = process.env.NODE_ENV;

export default () => {
  const api = create( {
    baseURL: env === 'production' ? 'http://production.api.com' : 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 30000
  } );

  const auth = () =>
    api.post( `/auth` );

  const getAssets = ( businessLine: BusinessLine) =>
    api.get( `/assets/` + businessLine );

  const getAsset = ( assetId: string ) =>
    api.get( `/assets/find/` + assetId );

  const addAsset = ( asset: Asset ) =>
    api.post( `/assets/`, {
      asset: asset
    } );

  const updateAsset = ( asset: Asset ) =>
    api.put( `/assets/`, {
      asset: asset
    } );

  const deleteAsset = ( assetId: string ) =>
    api.delete( `/assets/` + assetId );

  const startTest = ( test_id: string, resolution: Resolution, persona: Persona, pathAssertions: PathAssertions ) =>
    api.post('/tests/start', {
      test_id,
      resolution,
      persona,
      pathAssertions
    });

  const addPersona = ( persona: Persona, asset_id: string ) =>
    api.post('/assets/persona', {
      persona,
      asset_id
    });

  const updatePersona = ( persona: Persona ) =>
    api.put('/assets/persona', {
      persona
    });

  const deletePersona = ( personaId: string ) =>
    api.delete('/assets/persona/' + personaId );

  return {
    auth,
    getAssets,
    getAsset,
    addAsset,
    updateAsset,
    deleteAsset,
    startTest,
    addPersona,
    updatePersona,
    deletePersona
  };
};