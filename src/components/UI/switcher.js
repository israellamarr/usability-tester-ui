// @flow

import React                  from 'react';
import classNames             from 'classnames';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Creators }           from 'app/actions/index';
import styled                 from 'styled-components';
import type { BusinessLine } from 'app/types/index.js';
import DOMAIN_CONF from 'app/conf/domain-conf.js';
import { shadowMixin } from 'app/themes/mixins';
import { breakPoints } from 'app/themes';

export type Props = {
  activeDomain: string,
  AppSetActiveViewDomain: typeof Creators.AppSetActiveViewDomain
};

export type State = {

};

class Switcher extends React.Component<Props, State> {
  constructor () {
    super();
  }

  viewTests = ( domain: BusinessLine ) => {
    this.props.AppSetActiveViewDomain( domain );
  };

  render () {
    return (
      <List id="asset-switcher">
        <ListItem
          className={ classNames(
            'switch icon',
            { 'active': ( this.props.activeDomain === 'all') }
          ) }
          onClick={ () => this.viewTests( 'all' ) }>
          All
        </ListItem>
        {
          DOMAIN_CONF.domains.map(
            ( domain, index ) => {
              const icons = classNames(
                'switch icon',
                { 'active': ( this.props.activeDomain === domain.domain ) }
              );
              return <ListItem
                key={ index }
                className={ icons }
                onClick={ () => this.viewTests( domain.domain ) }>
                { domain.title }
                {/*<img src={ require(`static/icons/${ domain.icon }.png`) } alt={ domain.title }/>*/}
              </ListItem>;
            }
          )
        }
      </List>
    );
  }
}

const List = styled.ul`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: ${ props => props.theme.color };
  list-style: none;
  text-align: center;
  background: ${ props => props.theme.cardBG };
  width: 100%;
  padding: 0;
  margin: 0 0 8px 0;
  @media (max-width: ${ breakPoints.md }) {
    flex: 0 1 auto;
    text-align: left;
    width: 100%;
    max-width: 100%;
    margin: auto;
    flex-direction: row;
  }
`;

const ListItem = styled.li`
  border: thin solid ${ props => props.theme.trimColor };
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: flex-start;
  padding-left: 8px;
  align-items: center;
  text-align: left;
  transition: background-color 200ms cubic-bezier(0.39, 0.575, 0.565, 1);   

  &.active {
    border-color: ${ props => props.theme.switcherHover };
  }

  &:hover {
    background-color: #f8f8f8;
  }
`;

const mapStateToProps = ( state ) => {
  return {
    activeDomain: state.app.activeDomain
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Switcher );