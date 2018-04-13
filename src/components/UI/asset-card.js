// @flow

import * as React from "react";

import styled, { keyframes } from 'styled-components';
import type { Asset } from 'app/types/index';

import { connect }                  from 'react-redux';
import { Creators }                 from 'app/actions/index';
import { bindActionCreators }       from 'redux';
import ReactTooltip                 from 'react-tooltip';
import { Link }                     from 'react-router-dom';

import FaPlay from 'react-icons/lib/fa/play';
import MdSpinner from 'react-icons/lib/md/settings-backup-restore';
import MdLink from 'react-icons/lib/md/link';
import MdCamera from 'react-icons/lib/md/camera-alt';
import MdEdit from 'react-icons/lib/md/edit';
import MdClose from 'react-icons/lib/md/close';
import MdInfo from 'react-icons/lib/md/satellite';

import { Fragment }                 from 'react';
import { breakPoints } from 'app/themes/index';
import { shadowMixin } from 'app/themes/mixins';
// import SentryIcon from 'static/icons/sentry-glyph-black.svg';

import DOMAIN_CONF                  from 'app/conf/domain-conf.js';

export type Props = {
  asset: Asset,
  APIDeleteAsset: typeof Creators.APIDeleteAsset,
  APIStartTest: typeof Creators.APIStartTest,
  AppSetTestActive: typeof Creators.AppSetTestActive
}

export type State = {

}

const colorForPercent = ( percent: number ): string => {
  switch ( true ) {
    case ( percent >= 75 ):
      return '#43A047';
    case ( percent >= 50 ):
      return '#FFA000';
    default:
      return '#E64A19';
  }
};

class AssetCard extends React.Component<Props, State> {

  constructor ( ) {
    super();
  }

  startBuild = () => {
    this.props.APIStartTest( this.props.asset, this.state.resolution );
  };

  deleteAsset = () => {
    if ( window.confirm( 'Are you sure you would like to delete this asset?' ) ) {
      this.props.APIDeleteAsset( this.props.asset.asset_id );
    }
  };

  renderTestButton () {
    if ( !this.props.asset.active_builds.length ) {
      return (
        <Fragment>
          <Link to={ `/asset/${ this.props.asset.asset_id }/test` }>
            <Button>
              <FaPlay />
            </Button>
          </Link>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <RunningTest>
            <Spinner>
              <MdSpinner/>
            </Spinner>
          </RunningTest>
        </Fragment>
      );
    }
  }

  renderAssetHealth = () => {
    const { asset } = this.props;
    const { asset_health } = asset;
    const percent = Math.round( asset_health.pass_rate * 100 );

    if ( asset.completed_tests.length !== 0) {
      const AssetHealth = LinkAction.extend`
        background-color: ${ colorForPercent( percent ) };
        color: white;
        &:hover {
          background-color: ${ colorForPercent( percent ) };
        }
 
        span {
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          font-size: 10px;
        }
      `;

      return (
        <Fragment>
          <AssetHealth data-tip={ `${ percent }% of the last ${ asset.completed_tests.length } tests have passed` } >
          <span>
            { percent }%
          </span>
          </AssetHealth>
          <ReactTooltip />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <LinkAction data-tip={ `No tests have been run for this asset` } > -- </LinkAction>
          <ReactTooltip />
        </Fragment>
      );
    }
  };

  renderProofLink = () => {
    const { asset } = this.props;
    if ( asset.proof_url && asset.proof_url.length > 0 ) {
      return (
        <a href={ asset.proof_url } target="_blank" >
          <ProofLink>
            <img src={ require( 'static/icons/proof-logo.png' ) }
                 width={ 10 }
                 height={ 10 }
            />
          </ProofLink>
        </a>
      );
    }
  };

  renderSentryLink = () => {
    const { asset } = this.props;

    return (
      <a href={ `https://sentry.io/_SENTRYACCOUNT_/fm/?query=url%3A${ encodeURIComponent( asset.url ) }` } target="_blank" >
        <SentryLink>
          {/*<SentryIcon width={ 36 } />*/}
        </SentryLink>
      </a>
    );
  };

  render () {
    let { asset } = this.props;
    return (
      <Card>
        <Data>
          <AssetID>
            { asset.asset_id }
          </AssetID>
          <Description>
            { asset.description }
          </Description>
          <Version>
            { asset.path } • { asset.version }
          </Version>
          <Links>

            { this.renderAssetHealth() }

            <Link to={ `/asset/${ asset.asset_id }/history` }>
              <GalleryLink>
                <MdInfo/>
              </GalleryLink>
            </Link>

            <Link to={ `/asset/${ this.props.asset.asset_id }/edit` }>
              <EditLink>
                <MdEdit/>
              </EditLink>
            </Link>

            <a href={ asset.url } target="_blank" >
              <URLLink>
                <MdLink/>
              </URLLink>
            </a>

            { this.renderProofLink() }

            { this.renderSentryLink() }

          </Links>
        </Data>

        <TestActions>
          { this.renderTestButton() }
        </TestActions>
      </Card>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {

  };
};

const Card = styled.div`
  margin: auto;
  max-width: 412px; 
  box-sizing: border-box;
  color: ${ props => props.theme.color };
  background-color: ${ props => props.theme.cardBG };
  padding: 16px;
  margin-bottom: 8px;
  max-height: 182px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  box-shadow: ${ shadowMixin( 1 ) };
  @media ( max-width: ${ breakPoints.md } ) {
    padding: 8px 16px 8px 12px;
  }
`;

// Asset Data
const Data = styled.div`
  flex: 1;
`;

const AssetID = styled.div`
  margin-bottom: 4px;
  font-size: ${ props => props.theme.type.lg.content };
  @media( max-width: ${ breakPoints.md } ) {
    margin-bottom: 0;
    font-size: ${ props => props.theme.type.sm.subtext };
  }
`;

const Description = styled.div`
  font-size: ${ props => props.theme.type.lg.h3 };
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 256px;
  @media (max-width: ${ breakPoints.md } ) {
    font-size: ${ props => props.theme.type.sm.h3 };
  }
`;

const Version = styled.div`
  text-transform: uppercase;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: ${ props => props.theme.type.lg.content };
  @media( max-width: ${ breakPoints.md } ) {
    margin: 0;
  }
`;

// Card Actions
const Links = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LinkAction = styled.div`
  font-size: 16px;
  width: 2em;
  height: 1.25em;
  display: inline-flex;
  border-radius: 3px;
  padding: 0;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${ props => props.theme.assetLinkBG };
  color: ${ props => props.theme.assetLinkColor };
  transition: 100ms;
  transition-property: background-color, color;
  box-shadow: ${ shadowMixin( 1 ) };
  &:hover {
    background-color: ${ props => props.theme.assetLinkHoverBG };
    color: ${ props => props.theme.assetLinkHoverColor };
  }

`;

const EditLink = LinkAction.extend`
  
`;

const URLLink = LinkAction.extend`
  
`;

const GalleryLink = LinkAction.extend`
  
`;

const ProofLink = LinkAction.extend`
  background-color: #0075c1;
  width: 20px;
  &:hover {
    background-color: #03A9F4;
  }
`;

const SentryLink = LinkAction.extend`
  background-color: #6c5fc7;
  width: 20px;
  
  svg path {
    fill: white !important;
  }
  
  &:hover {
    background-color: #8070ec;
  }
`;

const TestActions = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: 100%;
  padding-right: 0;
  margin-right: 0;
  @media (max-width: ${ breakPoints.md }) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } 
`;

const Button = styled.button`
  text-align: center;
  background: ${ props => props.theme.headerBG } none;
  color: ${ props => props.theme.color };
  min-width: 36px;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  outline: none;
  background-color: ${ props => props.theme.trimColor };
  border: none;
  box-shadow: ${ shadowMixin( 1 ) };
  transition: box-shadow 200ms;
  margin: 0;  
  padding: 0;  
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  
  &:hover {
    border: none;
    background-color: ${ props => props.theme.buttonHover };
    color: white;
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    outline: none;
    box-shadow: none;
    transition: none;
  }
`;

const RunningTest = styled.div`
  line-height: 50%;
  text-align: center;
  width: 36px;
  height: 36px;
  color: white;
  background-color: ${ props => props.theme.buttonAction };
  border: none;
  border-radius: 100%;
  outline: none;
  box-shadow: ${ shadowMixin( 1 ) };
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${ breakPoints.md }) {
    font-size: 16px;
    
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  font-size: 28px;
  svg {
    transform: scaleX(-1);
  }
  
  display: inline-flex;
  justify-content: center;
  align-items: center;
  animation: ${ rotate360 } 2s linear infinite;
`;

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AssetCard );