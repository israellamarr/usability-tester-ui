// @flow
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Login from 'app/components/containers/login';
import AddAsset from 'app/components/containers/add-asset';
import EditAsset from 'app/components/containers/edit-asset';
import AddPersona from 'app/components/containers/add-persona';
import EditPersona from 'app/components/containers/edit-persona';
import TestOptions from 'app/components/containers/test-options';
import AssetList from 'app/components/containers/asset-list';
import AssetGallery from 'app/components/containers/asset-test-history/index';

import styled from 'styled-components';

import DOMAIN_CONF from 'app/conf/domain-conf';

export type RouteConfig = {
  name: string,
  render: () => React.Component,
  dependenciesReady: ( state: Object ) => boolean,
  path: string,
  navOpen: boolean
}

const login = {
  name: 'Login',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <Login/>
    </CSSTransitionGroup>
  ),
  path: '/sign-in',
  dependenciesReady : state => {
    return true;
  }
};

const addAsset = {
  name: 'Add Asset',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <AddAsset/>
    </CSSTransitionGroup>
  ),
  path: '/assets/add',
  dependenciesReady : state => {
    return true;
  }
};

const runTest = {
  name: 'Run Test',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <TestOptions/>
    </CSSTransitionGroup>
  ),
  path: '/asset/:assetID/test',
  dependenciesReady : state => {
    return !state.app.activeAssetLoading && state.app.activeAsset;
  }
};

const editAsset = {
  name: 'Edit Asset',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <EditAsset/>
    </CSSTransitionGroup>
  ),
  path: '/asset/:assetID/edit',
  dependenciesReady : state => {
    return !state.app.activeAssetLoading && state.app.activeAsset;
  }
};

const addPersona = {
  name: 'Add Persona',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="SlideIn">
      <AddPersona/>
    </CSSTransitionGroup>
  ),
  path: '/persona/:assetID/add',
  dependenciesReady : state => {
    return true;
  }
};

const editPersona = {
  name: 'Edit Persona',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="SlideIn">
      <EditPersona/>
    </CSSTransitionGroup>
  ),
  path: '/persona/:assetID/:personaID',
  dependenciesReady : state => {
    return state.app.activeEditingPersona;
  }
};

const viewAssets = {
  name: 'View Assets',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <AssetList/>
    </CSSTransitionGroup>
  ),
  path: '/assets/:activeDomain',
  dependenciesReady : state => {
    return !state.api.refreshingAssets && !state.api.fetchingAssets;
  }
};

const assetGallery = {
  name: 'View Test History',
  render: () => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
      transitionName="Fade">
      <AssetGallery/>
    </CSSTransitionGroup>
  ),
  path: '/asset/:assetID/history',
  dependenciesReady : state => {
    return !state.app.activeAssetLoading && state.app.activeAsset;
  }
};


const subNav = DOMAIN_CONF.domains.map( elem => {
  return {
    name: elem.title,
    to: `${ elem.domain }`
  };
} );

const links = [
  {
    name: 'Add Asset',
    to: 'assets/add'
  },
  {
    name: 'Assets',
    to: 'assets',
    rootTo: 'all',
    subNav
  }
];

const routes = [
  login,
  addAsset,
  editAsset,
  addPersona,
  editPersona,
  assetGallery,
  viewAssets,
  runTest
];

const Icon = styled.div`
  font-size: 12px;
  margin-right: 4px;
`;


export { routes, links };