// @flow

import * as React               from "react";
import { Redirect, withRouter } from 'react-router-dom';
import { connect }              from 'react-redux';
import { Creators }             from 'app/actions/index';
import { bindActionCreators }   from 'redux';
import styled                   from 'styled-components';

import { breakPoints }          from 'app/themes';
import type { StatusMessage }   from 'app/types/index';
import TextInput                from '@angelrush/react-components/lib/text-input';
import FormContainer            from 'app/components/UI/layout/form-container';
import SubmitButton             from 'app/components/UI/inputs/submit-button';

export type Props = {
  statusMessage: StatusMessage,
  userAuthorized: boolean,
  AzureLogin: typeof Creators.AzureLogin
}

export type State = {
  email: string,
  password: string,
  errors: Object,
}

class Login extends React.Component<Props, State> {

  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  validateForm = () => {
    let valid = true;
    let newErrors = {};
    if ( ! this.state.email ) {
      valid = false;
      newErrors.email = ['Email is required'];
    }
    if ( ! this.state.password ) {
      valid = false;
      newErrors.password = ['Password is required'];
    }
    if ( newErrors ) {
      this.setState({ errors: { ...this.state.errors, ...newErrors } });
    } else {
      this.setState({ errors: {} });
    }
    return valid;
  };

  submitForm = () => {
    if ( this.validateForm() ) {
      this.props.AzureLogin( this.state.email, this.state.password );
    }
  };

  render () {

    return (
      <Container>
        <Header>Sign in</Header>
        { this.props.userAuthorized ? <Redirect to='/assets/all' /> : '' }
        <TextInput
          label={ 'email' }
          value={ this.state.email }
          error={ this.state.errors.email }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ email: event.target.value }) } />
        <TextInput
          label={ 'password' }
          value={ this.state.password }
          error={ this.state.errors.password }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ password: event.target.value }) } />
        <SignIn onClick={ this.submitForm }>sign in</SignIn>
      </Container>
    );
  }
}

const Container = FormContainer.extend`
  max-width: ${ breakPoints.sm }
`;

const Header = styled.h2`
  text-align: center;
  font-size: ${ props => props.theme.type.lg.h2 }
`;

const SignIn = SubmitButton.extend`
  width: 100%;
  text-transform: uppercase;
`;

const mapStateToProps = ( state ) => {
  return {
    statusMessage: state.app.statusMessage,
    userAuthorized: state.app.userAuthorized
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( Login ) );

