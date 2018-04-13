// @flow

import Toggle from 'material-ui/Toggle';

import React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';
import { Creators } from 'app/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MdMenu from 'react-icons/lib/md/menu';

import { shadowMixin } from 'app/themes/mixins';
import { breakPoints } from 'app/themes';

import Toast from 'app/components/UI/toast';

export type Props = {
  title: string,
  darkTheme: boolean,
  navOpen: boolean,
  sideNavOpen: boolean,
  navTitle: string,
  SettingsToggleDarkTheme: typeof Creators.SettingsToggleDarkTheme,
  AppSetSideNavOpen: typeof Creators.AppSetSideNavOpen,
  AppSetNavOpen: typeof Creators.AppSetNavOpen
}

class AppHeader extends React.Component<Props, {}> {
  constructor ( props ) {
    super( props );
  }

  toggleSideNav = () => {
    this.props.AppSetSideNavOpen( !this.props.sideNavOpen );
  };

  toggleNav = () => {
    this.props.AppSetNavOpen( !this.props.navOpen );
  };

  render () {
    return (
      <HeaderContent>
        <TopRow>
          <AppTitle>
            { this.props.title }
          </AppTitle>
          <Menu>
            <MdMenu onClick={ this.toggleSideNav }/>
          </Menu>
        </TopRow>
        <Toast />
      </HeaderContent>
    );
  }
}

const HeaderContent = styled.div`
  width: 100%;
  user-select: none;
  padding: 0;
  margin: 0;
  border-bottom: ${ props => props.theme.trimColor };
`;

const TopRow = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: ${ props => props.theme.layout.headerHeightPx }px;
  padding-left: ${ props => props.theme.layout.contentMarginPx }px;
  padding-right: ${ props => props.theme.layout.contentMarginPx }px;
  align-items: center;
  justify-content: space-between;
  background-color: ${ props => props.theme.headerBG };
  color: ${ props => props.theme.color };
  font-size: ${ props => props.theme.type.lg.title };
  box-shadow: ${ shadowMixin( 1 ) };
  z-index: 100;
  @media (max-width: ${ breakPoints.md }) {
    font-size: ${ props => props.theme.type.sm.title };
    grid-template-columns: 50% 50%; 
  }
`;

const AppTitle = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  font-size: ${ props => props.theme.type.lg.title };
  @media (max-width: ${ breakPoints.md }) {
    font-size: ${ props => props.theme.type.sm.title }; 
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 22px;
  
  @media ( min-width: ${ breakPoints.md }) {
    display: none;
  }
`;

const mapStateToProps = ( state ) => {
  return {
    darkTheme: state.settings.darkTheme,
    navOpen: state.app.navOpen,
    sideNavOpen: state.app.sideNavOpen,
    navTitle: state.app.navTitle
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AppHeader );