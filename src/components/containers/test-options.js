// @flow

import * as React from "react";
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import MdCircle from 'react-icons/lib/md/fiber-manual-record';
import MdAdd from 'react-icons/lib/md/add';
import MdEdit from 'react-icons/lib/md/edit';

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/twilight';

import type { Asset, Persona, PathAssertions, StatusMessage, Resolution } from 'app/types';

import SelectList             from '@angelrush/react-components/lib/select-list';
import { breakPoints }        from 'app/themes';
import Spinner                from 'app/components/UI/loader';
import SubmitButton from 'app/components/UI/inputs/submit-button';
import SplitContainer from 'app/components/UI/layout/split-container';
import FormContainer from 'app/components/UI/layout/form-container';
import HeaderContainer from 'app/components/UI/text/header-container';
import { withRouter } from 'react-router-dom';

const Fragment = React.Fragment;

export type Props = {
  theme: any,
  activeAssetID: string,
  activeAsset: Asset,
  activeAssetLoading: boolean,
  match: Object,
  AppSetActiveAssetLoading: typeof Creators.AppSetActiveAssetLoading,
  AppLastResponse: typeof Creators.AppLastResponse,
  statusMessage: StatusMessage,
  APIStartTest: typeof Creators.APIStartTest
}

export type State = {
  savePersonaTimeout: any,
  savePathAssertionsTimeout: any,
  resolution: Resolution,
  asset: Asset,
  persona: Persona,
  personaSaved: boolean,
  pathAssertions: PathAssertions,
  pathAssertionsSaved: boolean,
  personaEditor: string,
  pathEditor: string,
  testRunning: boolean,
  errors: Object,
}

const DesktopMed = {
  name: 'Desktop',
  x: 1024,
  y: 720
};

const Resolutions: Array<Resolution> = [
  DesktopMed,
  {
    name: 'iPhone 7',
    x: 375,
    y: 667
  },
  {
    name: 'Nexus 6P',
    x: 412,
    y: 732
  },
  {
    name: 'Kindle Fire HDX',
    x: 800,
    y: 1280
  }
];

class TestOptions extends React.Component<Props, State> {

  constructor () {
    super();
    this.state = {
      savePersonaTimeout: null,
      savePathAssertionsTimeout: null,
      resolution: DesktopMed,
      asset: {
        asset_id: '',
        asset_type: '',
        business_line: '',
        description: '',
        path: '',
        test_id: '',
        url: '',
        version: '',
        proof_url: '',
        personas: []
      },
      persona: {
        persona_id: '',
        persona_name: '',
        data: {}
      },
      personaSaved: true,
      pathAssertions: [
        { "name": "birthday" },
        { "name": "gender" },
        { "name": "body_metrics" },
        { "name": "aspire_why", "type": "MultipleChoice" },
        { "name": "service_reasoning", "type": "SingleChoice" },
        { "name": "medical_exam", "type": "YesNo" },
        { "name": "prescriptions", "type": "YesNo" },
        // { "name": "prescriptions_current", "type": "MultipleChoice" },
        // { "name": "prescription_previous", "type": "MultipleChoice" },
        { "name": "allergy_buproprion", "type": "YesNo" },
        { "name": "allergy_naltrexone", "type": "YesNo" },
        { "name": "rx_current", "type": "MultipleChoice" },
        { "name": "maois", "type": "YesNo" },
        { "name": "suffering", "type": "MultipleChoice" }
      ],
      pathAssertionsSaved: true,
      pathEditor: '[\n' +
      '  { "name": "birthday" },\n' +
      '  { "name": "gender" },\n' +
      '  { "name": "body_metrics" },\n' +
      '  { "name": "aspire_why", "type": "MultipleChoice" },\n' +
      '  { "name": "service_reasoning", "type": "SingleChoice" },\n' +
      '  { "name": "medical_exam", "type": "YesNo" },\n' +
      '  { "name": "prescriptions", "type": "YesNo" },\n' +
      '  { "name": "allergy_buproprion", "type": "YesNo" },\n' +
      '  { "name": "allergy_naltrexone", "type": "YesNo" },\n' +
      '  { "name": "rx_current", "type": "MultipleChoice" },\n' +
      '  { "name": "maois", "type": "YesNo" },\n' +
      '  { "name": "suffering", "type": "MultipleChoice" }\n' +
      ']',
      personaEditor: '',
      testRunning: false,
      errors: {},
    };
  }

  componentDidUpdate ( prevProps ) {
    if ( this.props.activeAsset !== prevProps.activeAsset ) {
      this.setState( { asset: { ...this.state.asset, ...this.props.activeAsset }  } );
    }
  }

  startBuild = () => {
    const { activeAsset } = this.props;
    this.props.APIStartTest(
      activeAsset,
      this.state.resolution,
      this.state.persona,
      this.state.pathAssertions
    );
    this.setState( { testRunning: true } );
    setTimeout( () => {
      this.props.history.push( `/assets/${ activeAsset.business_line }` );
    }, 1000 );
  };

  renderLoading = () => {
    return ( <Spinner /> );
  };

  personaFormOutput = ( newValue ) => {
    this.setState( { personaEditor: newValue, personaSaved: false } );
    clearTimeout( this.state.savePersonaTimeout );
    this.setState( { savePersonaTimeout: setTimeout(() => {
        this.setState( { persona: { ...this.state.persona, data: JSON.parse(this.state.personaEditor) }, personaSaved: true } );
      }, 3500)
    } );
  };

  pathAssertionFormOutput = ( newValue ) => {
    this.setState( { pathEditor: newValue, pathAssertionsSaved: false } );
    clearTimeout( this.state.savePathAssertionsTimeout );
    this.setState( { savePathAssertionsTimeout: setTimeout(() => {
        this.setState( { pathAssertions: [ ...JSON.parse(this.state.pathEditor) ], pathAssertionsSaved: true } );
      }, 3500)
    } );
  };

  selectPersona = ( persona_id ) => {
    const selectedPersona = this.props.activeAsset.personas.find( persona => {
      return persona.persona_id === persona_id;
    } );
    this.setState( { persona: { ...this.state.persona, ...selectedPersona }, personaEditor: JSON.stringify( selectedPersona.data, null, 4 ) } );
  };

  renderEditors = () => {
    let personas = [
      { title: 'Select a Persona', value: '' },
      ...this.props.activeAsset.personas.map( persona => {
        return {
          title: persona.persona_name,
          value: persona.persona_id
        };
      } )
    ];

    return (
      <Fragment>
        <FormGroup>
          <Label>Path Assertions:</Label>
          <AceEditor
            mode="javascript"
            theme={ this.props.theme.editorTheme }
            height="250px"
            width="100%"
            setOptions={ { tabSize: 2 } }
            value={ this.state.pathEditor }
            onChange={ this.pathAssertionFormOutput }
            name="pathAssertionForm"
            editorProps={ { $blockScrolling: true } } />
        </FormGroup>
        <FormGroup>
          <Label>Persona:</Label>
          <PersonaContainer>
            <SelectList
              data={ personas }
              value={ personas[ 0 ] }
              onChange={ persona_id => this.selectPersona( persona_id ) } />
            <PersonaActions>
              <Link to={ `/persona/${ this.props.activeAssetID }/${ this.state.persona.persona_id }` }><MdEdit size={ 18 } /></Link>
              <Link to={ `/persona/${ this.props.activeAssetID }/add` }><MdAdd size={ 18 } /></Link>
            </PersonaActions>
          </PersonaContainer>
          <AceEditor
            mode="javascript"
            theme={ this.props.theme.editorTheme }
            height="400px"
            width="100%"
            setOptions={ { tabSize: 2 } }
            value={ this.state.personaEditor }
            onChange={ this.personaFormOutput }
            name="personaForm"
            editorProps={ { $blockScrolling: true } } />
        </FormGroup>
      </Fragment>
    );
  };

  renderForm = () => {
    return (
      <article className={ 'mb-4' }>
        <SplitContainer>
          <FormGroup>
            <Label>Resolution:</Label>
            <ResolutionSelector onChange={ e => this.setState( { resolution: JSON.parse( e.target.value) } ) }>
              {
                Resolutions.map( ( resolution, index ) =>
                  (
                    <option key={ index } value={ JSON.stringify( resolution ) }>
                      { resolution.name }
                    </option>
                  )
                )
              }
            </ResolutionSelector>
          </FormGroup>
          <FormGroup>
            <Label>Testing Url:</Label>
            <div>{ this.props.activeAsset.url }</div>
          </FormGroup>
        </SplitContainer>

        {
          this.props.activeAsset.asset_type.toLowerCase() === 'survey' ?
            this.renderEditors() : ''
        }

      </article>
    );
  };

  renderTestButton = () => {
    // if ( ! this.state.testRunning ) {
      return (
        <SubmitButton onClick={ this.startBuild }>Start Test</SubmitButton>
      );
    // } else {
    //   return (
    //     <SubmitButton>
    //       <div className="dancing-dots">
    //         <span className="dot-1"><MdCircle size={ 12 } /></span><span className="dot-2"><MdCircle size={ 12 } /></span><span className="dot-3"><MdCircle size={ 12 } /></span>
    //       </div>
    //     </SubmitButton>
    //   );
    // }
  };

  render () {
    return (
      <Container>
        <HeaderContainer>
          <span>Configure Test</span>
        </HeaderContainer>

        { this.props.activeAssetLoading ? this.renderLoading() : this.renderForm() }

        { this.renderTestButton() }

      </Container>
    );
  }
}

const Container = FormContainer.extend`
  // color: ${ props => props.theme.color };
  // border-color: ${ props => props.theme.color };
  // transition: 300ms;
  // transition-property: background-color, height, width;
  // background-color: ${ props => props.theme.contentBG };
  // height: 100%;
`;

const FormGroup = styled.section`
  margin-bottom: 2rem;
`;

const PersonaContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 420px;
`;

const PersonaActions = styled.div`
  margin-bottom: 20px;
    margin-left: 5px;
  & a, & a:visited {
    color: #fff;
    margin-left: 10px;
  }
`;

const ResolutionSelector = styled.select`
  width: 100%;
  color: ${ props => props.theme.color };
  background-color: ${ props => props.theme.headerBG };
  margin-bottom: 12px;
  padding: 8px;
  text-align: center;
  border: thin solid ${ props => props.theme.trimColor };
  border-radius: 2px;
  font-size: ${ props => props.theme.type.lg.content };
  @media (max-width: ${ breakPoints.md }) {
    font-size: ${ props => props.theme.type.sm.content };
  }
`;

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

const mapStateToProps = ( state ) => {
  return {
    activeAssetLoading: state.app.activeAssetLoading,
    statusMessage: state.app.statusMessage,
    activeAsset: state.app.activeAsset,
    activeAssetID: state.app.activeAssetID
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( withTheme(TestOptions) ) );

