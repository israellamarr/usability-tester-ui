// @flow

import * as React from "react";

import {Link, Route, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Fragment } from 'react';


import { Creators } from 'app/actions/index';
import { breakPoints } from 'app/themes/index';
import { Asset } from 'app/types/index';
import FormContainer from 'app/components/UI/layout/form-container';

import TestListView from 'app/components/containers/asset-test-history/test-list-view';
import TestDetailView from 'app/components/containers/asset-test-history/test-detail-view';

export type Props = {
  activeAsset: Asset,
  AppSetActiveAssetID: Creators.AppSetActiveAssetID,
  APIGetAssetById: Creators.APIGetAssetById
}

export type State = {

}

class AssetTestHistory extends React.Component<Props, State> {

  componentDidMount () {

  }

  render () {
    return (
      <Container>
        <Switch>
          <Route path='/asset/:assetID/history/:testID' component={ TestDetailView }  />
          <Route exact={ true } path='/asset/:assetID/history' component={ TestListView }  />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    activeAsset: state.app.activeAsset
  };
};

const Container = FormContainer.extend`

`;

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( AssetTestHistory ) );