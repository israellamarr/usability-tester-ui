// @flow

import * as React from "react";
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';
import Loader from 'app/components/UI/loader';
import type { RouteConfig } from 'app/components/routes/config';
import { withRouter } from 'react-router-dom';

export type Props = {
  match: Object,
  appState: Object,
  route: RouteConfig,
  AppSetNavOpen: typeof Creators.AppSetNavOpen,
  AppSetNavTitle: typeof Creators.AppSetNavTitle,
  AppSetActiveAssetID: typeof Creators.AppSetActiveAssetID,
  AppGetPersonaFromActiveAsset: typeof Creators.AppGetPersonaFromActiveAsset,
  AppSetActiveViewDomain: typeof Creators.AppSetActiveViewDomain,
  AppSetActiveViewDomain: typeof Creators.AppSetActiveViewDomain
}

export type State = {

}

class RouteGate extends React.Component<Props, State> {

  componentDidMount () {
    if ( this.props.match.params.assetID ) {
      this.props.AppSetActiveAssetID( this.props.match.params.assetID );
    }

    if ( this.props.match.params.personaID ) {
      this.props.AppGetPersonaFromActiveAsset( this.props.match.params.personaID );
    }

    if ( this.props.match.params.activeDomain ) {
      this.props.AppSetActiveViewDomain( this.props.match.params.activeDomain );
    }

    // this.props.AppSetNavOpen( this.props.route.navOpen );
    // if ( this.props.route.navOpen ) {
    //   this.props.AppSetNavTitle( this.props.route.name );
    // }
  }

  redirectUnauthorized = () => {
    if ( ! this.props.appState.app.userAuthorized ) {
      console.log( 'route-gate check', this.props.appState.app.userAuthorized );
      return <Redirect to={ '/sign-in' } />;
    }
  };

  render () {
    return (
      <div className={ 'route-block' }>
        { this.redirectUnauthorized() }
        {
          this.props.route.dependenciesReady( this.props.appState ) ?
            this.props.route.render()
            :
            <Loader type={ 'spin' }/>
        }
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    appState: state
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( RouteGate ) );