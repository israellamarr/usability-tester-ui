// @flow

import ThemeToggle from 'app/components/UI/inputs/theme-toggle';
import { links } from 'app/components/routes/config';

import React, { Fragment } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';
import { Creators } from 'app/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { shadowMixin } from 'app/themes/mixins';
import { breakPoints } from 'app/themes';

export type Props = {
  sideNavOpen: boolean,
  userAuthorized: boolean,
  AppSetSideNavOpen: typeof Creators.AppSetSideNavOpen
}

class SideNav extends React.Component<Props, {}> {
  constructor ( props ) {
    super( props );
  }

  componentDidMount () {

  }

  isSelected ( module, parent ) {
    if ( !parent ) {
      const name = module.subNav ? `${ module.to }/${ module.rootTo }`: module.to;
      return this.props.location.pathname.indexOf( name ) !== -1;
    } else {
      return this.props.location.pathname.indexOf( `${ parent.to }/${ module.to}` ) !== -1;
    }
  }

  renderSideNav = () => {
    return (
      <SideNavWrapper className={ classNames( { 'hidden': !this.props.sideNavOpen } ) }>
        <Links onClick={ e => this.props.AppSetSideNavOpen( false ) }>
          {
            links.map( ( module, i )=> (
              <Fragment key={ i }>
                <Link to={ `/${  module.to }` }
                      replace={ this.isSelected( module ) }>
                  <NavLink className={ classNames( { 'selected' : this.isSelected( module ) } ) }>
                    { module.name }
                  </NavLink>
                </Link>
                { module.subNav ?
                  module.subNav.map( ( sub, i ) => (
                    <Link key={ i } to={ `/${ module.to }/${ sub.to }` }
                          replace={ this.isSelected( sub, module ) } >
                      <SubNavLink className={ classNames( { 'selected' : this.isSelected( sub, module ) } ) }>
                        { sub.name }
                      </SubNavLink>
                    </Link>
                  ) )
                  : ''}
              </Fragment>
            ) )
          }
        </Links>
        <ThemeToggle/>
      </SideNavWrapper>
    );
  };

  render () {
    return (
      <Fragment>
      { this.props.userAuthorized ? this.renderSideNav() : '' }
      </Fragment>
    );
  }
}

const SideNavWrapper = withRouter( styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  display: flex;
  left: 0;
  width: ${ props => props.theme.layout.sideNavWidthPX }px;
  height: calc( 100vh - ${ props => props.theme.layout.headerHeightPx }px );
  overflow-y: hidden;  
  background-color: ${ props => props.theme.sideNavBG };
  box-shadow: ${ shadowMixin( 1 ) };
  transition: 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-property: left;
  z-index: 3;
    
  &.hidden {
    left: -${ props => props.theme.layout.sideNavWidthPx + 1 }px;
  }

  a {
    text-decoration: none;
    color: ${ props => props.theme.color };
  } 

  @media (min-width: ${ breakPoints.md }) {

    width: ${ props => props.theme.layout.sideNavWidthDesktopPx }px;
    position: relative;   
    &.hidden {
      left: 0;
    }
  }
`);

const Links = styled.div`
  width: 100%;
  border-top: thin solid ${ props => props.theme.navTrim };
`;

const NavLink = styled.div`
  height: 48px;
  display: flex;
  padding-left: ${ props => props.theme.layout.contentMarginPx }px;
  font-size: ${ props => props.theme.layout.navLinkFontSize }px;
  align-items: center;
  text-transform: capitalize;
  border-bottom: thin solid ${ props => props.theme.navTrim };
  transition: background-color 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    background-color: ${ props => props.theme.trimColorHover };
  }
  
  &.selected {
    background-color: ${ props => props.theme.trimColor };
  }
`;

const SubNavLink = NavLink.extend`
  height: 32px;
  padding-left: ${ props => props.theme.layout.contentMarginPx * 1.5 }px;
  font-size: ${ props => props.theme.layout.navLinkFontSize * .85}px;
  overflow-x: hidden;
`;

const mapStateToProps = ( state ) => {
  return {
    sideNavOpen: state.app.sideNavOpen,
    userAuthorized: state.app.userAuthorized
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( SideNav ) );