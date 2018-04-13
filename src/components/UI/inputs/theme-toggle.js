// @flow

import * as React from "react";

import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';
import FaSun from 'react-icons/lib/fa/sun-o';
import FaMoon from 'react-icons/lib/fa/moon-o';
import styled from 'styled-components';
import Toggle from 'material-ui/Toggle';

export type Props = {
  darkTheme: boolean,
  SettingsToggleDarkTheme: typeof Creators.SettingsToggleDarkTheme
}

export type State = {

}

class ThemeToggle extends React.Component<Props, State> {
  componentDidMount () {

  }

  render () {
    return (
      <ToggleWrapper>
        <Icon>
          {
            this.props.darkTheme ? <FaMoon/> : <FaSun/>
          }
        </Icon>
        <Toggle
          style={{
            width: "36px",
            userSelect: 'none'
          }}
          labelStyle={{
            color:"#8d8d8d"
          }}
          thumbStyle={{
            backgroundColor: "#8d8d8d"
          }}

          thumbSwitchedStyle={{
            backgroundColor: "#c2c2c2"
          }}

          trackStyle={{
            backgroundColor: "#130c0c"
          }}

          trackSwitchedStyle={{
            backgroundColor: "#7d7d7d"
          }}
          onToggle={ this.props.SettingsToggleDarkTheme }
          toggled={ this.props.darkTheme }
        />
      </ToggleWrapper>
    );
  }
}


const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 16px;
  max-width: 128px;
  align-items: center;
`;

const Icon = styled.div`
  
`;

const mapStateToProps = ( state ) => {
  return {
    darkTheme: state.settings.darkTheme
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ThemeToggle );