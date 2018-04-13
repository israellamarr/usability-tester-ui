// @flow

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import styled, { withTheme } from 'styled-components';
import Loader from 'react-loaders';
import type { AppTheme } from 'app/themes';

export type Props = {
  theme: AppTheme,
  type: string
}

class LoaderContainer extends React.Component<Props, State> {

  static defaultProps = {
    type: 'bars'
  };

  constructor ( props ) {
    super( props );
  }

  render () {
    return (
      <Wrapper>
        <CSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
          transitionName="Fade">
          <Loader type="line-scale"
                  color={ this.props.theme.loaderColor }/>
        </CSSTransitionGroup>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 48px;
  height: 48px;
  margin: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: center;
`;

export default withTheme( LoaderContainer );