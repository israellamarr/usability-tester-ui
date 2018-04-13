// @flow

import * as React from "react";

import styled from 'styled-components';

import "react-image-gallery/styles/css/image-gallery.css";

import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';
import { Asset } from 'app/types/index';
import { Fragment } from 'react';
import ImageGallery from 'react-image-gallery';
import { withRouter } from 'react-router-dom';

export type Props = {
  activeAsset: Asset,
  AppSetActiveAssetID: Creators.AppSetActiveAssetID,
  APIGetAssetById: Creators.APIGetAssetById
}

export type State = {
  activeTest: Object
}

class TestDetailView extends React.Component<Props, State> {

  constructor ( props ) {
    super ( props );
    this.state = {
      activeTest: null
    };
  }

  componentDidMount () {
    const testID = this.props.match.params.testID;
    const tests = this.props.activeAsset.completed_tests;

    this.setState( {
      activeTest: tests.find( test => test._id === testID )
    } );
  }

  renderImageGallery = () => {

    if ( this.state.activeTest && this.state.activeTest.screenshots.length ) {
      const images = this.state.activeTest.screenshots.sort().map( shot => ( {
        original: shot,
        thumbnail: shot
      } ));
      return (
        <ImageGallery showThumbnails={ false } items={ images }/>
      );
    } else {
      return (
        // todo: global style h[x]
        // todo: create absent content component
        <h3>No Screenshots For Test</h3>
      );
    }
  };

  render () {

    return (
      <Fragment>
        <h3>Test Detail View</h3>
        <hr />
        <h4>
          Spec Results
        </h4>
        <h4>
          Path Assertion
        </h4>
        <h4>
          Persona
        </h4>
        <h4>
          Image Gallery
        </h4>
        <hr/>
        {
          this.renderImageGallery()
        }
      </Fragment>

    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    activeAsset: state.app.activeAsset
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( TestDetailView ) );