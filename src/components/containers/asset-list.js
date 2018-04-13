// @flow

import * as React from "react";

import { Creators } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import styled                  from 'styled-components';
import MdAdd                   from 'react-icons/lib/md/add';
import type { Asset, StatusMessage } from 'app/types/index';
import Switcher                from 'app/components/UI/switcher';
import AssetCard               from 'app/components/UI/asset-card';
import { breakPoints } from 'app/themes';
import DOMAIN_CONF from 'app/conf/domain-conf.js';
import Spinner from 'app/components/UI/loader';

export type Props = {
  assets: Array<Asset>,
  activeDomain: string,
  statusMessage: StatusMessage,
  loading: boolean,
  AppSetActiveViewDomain: typeof Creators.AppSetActiveViewDomain
}

export type State = {}

class AssetList extends React.Component<Props, State> {

  constructor ( props ) {
    super( props );
  }

  componentDidUpdate ( prevProps) {
    if ( this.props.match.params.activeDomain !== prevProps.match.params.activeDomain ) {
      this.props.AppSetActiveViewDomain( this.props.match.params.activeDomain );
    }
  }

  renderAssets () {
    if ( this.props.assets.length > 0 ) {
      return (
        <ListContainer id={'asset-list'}>
          { this.props.assets.map( ( asset, index ) => (
            ( <AssetCard key={ index } asset={ asset }/> )
          ) )
          }
        </ListContainer>
      );
    } else {
      return (
        <HelpText key="0" >No assets found</HelpText>
      );
    }
  }

  render () {
    return (
      <Container>
        <ContentContainer>
          { this.renderAssets() }
        </ContentContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  margin: auto;
`;

const ContentContainer= styled.div`
`;

const ListContainer = styled.div`
  padding-top: 8px;
  max-width: 512px;
  margin: auto;
`;


const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
`;

const HelpText = styled.div`
  text-align: center;
  font-size: ${ props => props.theme.type.lg.h3 };  
  padding-top: 32px;
`;

const mapStateToProps = ( state ) => {
  return {
    URLS: state.app.URLS,
    activeDomain: state.app.activeDomain,
    loading: state.api.fetchingAssets,
    assets: state.app.assets,
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) => bindActionCreators( Creators, dispatch);

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( AssetList ) );