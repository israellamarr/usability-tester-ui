// @flow

import * as React from "react";

import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Asset } from 'app/types/index';
import { Fragment } from 'react';

import MdRight from 'react-icons/lib/md/keyboard-arrow-right';
import MdAvatar from 'react-icons/lib/md/perm-identity';
import MdLaptop from 'react-icons/lib/md/laptop';
import MdPhone from 'react-icons/lib/md/phone';
import MdTablet from 'react-icons/lib/md/tablet';

import { format } from 'date-fns';

import { Creators } from 'app/actions/index';
import BaseButton from 'app/components/UI/inputs/base-button';
import TestCard from 'app/components/containers/asset-test-history/test-card';

export type Props = {
  activeAsset: Asset,
  AppSetActiveAssetID: Creators.AppSetActiveAssetID,
  APIGetAssetById: Creators.APIGetAssetById
}

export type State = {

}

class AssetGallery extends React.Component<Props, State> {

  componentDidMount () {

  }

  renderTestStats = () => {
    return (
      <ItemTestResults>
        <TestsPassed>
          0
        </TestsPassed>
        <TestsFailing>
          0
        </TestsFailing>
      </ItemTestResults>
    );
  };

  renderTestHistory () {
    return (
      <TestListWrapper>
        {
          this.props.activeAsset.completed_tests.sort(( a, b ) => {
            return new Date( b.start ) - new Date( a.start );
          } ).map( ( test, index ) => (
            <TestCard test={ test } key={ index }/>
          ) )
        }
      </TestListWrapper>
    );
  }

  render () {
    return (
      <Fragment>
        <Header>
          Test Results
        </Header>
        <SubHeader>
          { this.props.activeAsset.asset_id }
        </SubHeader>
        <hr />
        { this.renderTestHistory() }
      </Fragment>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    activeAsset: state.app.activeAsset
  };
};

const TestListWrapper = styled.div`
`;

const ItemTestResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
`;

const TestsResultTile = styled.div`
  background-color: lightgray;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: lighter;
  max-width: 36px;
  border: none;
`;

const TestsFailing = TestsResultTile.extend`
  background-color: #db4445;
`;

const TestsPassed = TestsResultTile.extend`
  background-color: #39aa56;
`;

const Header = styled.h3`
  text-align: left;
  margin-top: .25em;
  margin-bottom: .25em;
`;

const SubHeader = styled.h4`
  font-weight: lighter;
  margin-top: .25em;
  margin-bottom: .25em;
`;

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AssetGallery );