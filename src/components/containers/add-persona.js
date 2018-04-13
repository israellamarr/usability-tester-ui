// @flow

import * as React from "react";
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/twilight';

import type { Persona, StatusMessage } from 'app/types/index';
import TextInput                       from '@angelrush/react-components/lib/text-input';
import ButtonContainer                 from 'app/components/UI/layout/button-container';
import FormContainer                   from 'app/components/UI/layout/form-container';
import SubmitButton                    from 'app/components/UI/inputs/submit-button';
import CancelButton                    from 'app/components/UI/inputs/cancel-button';
import { breakPoints }                 from 'app/themes';

const Fragment = React.Fragment;

export type Props = {
  activeAssetID: string,
  statusMessage: StatusMessage,
  APIAddPersona: typeof Creators.APIAddPersona,
  AppLastResponse: typeof Creators.AppLastResponse,
  theme: any
}

export type State = {
  persona: Persona,
  personaSaved: boolean,
  personaEditor: string,
  saveTimeout: any,
  errors: Object,
}

class AddPersona extends React.Component<Props, State> {

  constructor ( props ) {
    super( props );
    this.state = {
      persona: {
        persona_id: '',
        persona_name: '',
        data: {}
      },
      personaSaved: true,
      personaEditor: '',
      saveTimeout: null,
      errors: {},
    };
  }

  personaFormOutput = ( newValue ) => {
    this.setState( { personaEditor: newValue, personaSaved: false } );
    clearTimeout( this.state.saveTimeout );
    this.setState( { saveTimeout: setTimeout(() => {
      this.savePersona();
    }, 3500)
  } );
  };

  savePersona = () => {
    this.setState( { persona: { ...this.state.persona, data: JSON.parse(this.state.personaEditor) } } );
  };

  addPersona = () => {
    this.savePersona();
    this.setState( { personaSaved: true } );
    setTimeout(() => {
      this.props.APIAddPersona( this.state.persona, this.props.activeAssetID );
    }, 300);
  };

  renderEditors = () => {
    let personaClasses = classNames( { 'disabled': this.state.personaSaved } );

    return (
      <Fragment>
        <section>
          <Label>Persona:</Label>
          <AceEditor
            mode="javascript"
            theme={ this.props.theme.editorTheme }
            height="500px"
            width="100%"
            setOptions={ { tabSize: 2 } }
            value={ this.state.personaEditor }
            onChange={ this.personaFormOutput }
            name="personaForm"
            editorProps={ { $blockScrolling: true } } />
          <ButtonContainer style={ { alignItems: 'baseline' } }>
          <Save className={ personaClasses } onClick={ this.addPersona }>Save</Save>
            <Link to={ `/asset/${ this.props.activeAssetID }/edit` }><CancelButton>Cancel</CancelButton></Link>
          </ButtonContainer>
        </section>
      </Fragment>
    );
  };

  render () {
    return (
      <Container>
        <TextInput
          label={ 'Persona Title' }
          maxLength='24'
          value={ this.state.persona.persona_name}
          error={ this.state.errors.persona_name}
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ persona: { ...this.state.persona, 'persona_name': event.target.value } }) } />
        { this.renderEditors() }
      </Container>
    );
  }
}

const Label = styled.label`
  display: block;
  color: ${ props => props.theme.color };
  margin-bottom: 4px;
  padding: 8px 0;
  font-size: ${ props => props.theme.type.lg.content };
  @media (max-width: ${ breakPoints.md }) {
    font-size: ${ props => props.theme.type.sm.content };
  }
`;

const Save = SubmitButton.extend`
  width: 100%;
  font-weight: 100;
  color: ${ props => props.theme.color };
  background-color: ${ props => props.theme.buttonAction };
  border-color: ${ props => props.theme.buttonAction };
  margin-left: auto;
  margin-top: 16px;
  &:hover {
    background-color: ${ props => props.theme.buttonAction };
    border-color: ${ props => props.theme.buttonAction };
  }
  &.disabled {
    cursor: disabled;
    opacity: .65;
    pointer-events: none;
  }
`;

const mapStateToProps = ( state ) => {
  return {
    activeAssetID: state.app.activeAssetID,
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

const Container = FormContainer.extend`
 
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withTheme( AddPersona ) );

