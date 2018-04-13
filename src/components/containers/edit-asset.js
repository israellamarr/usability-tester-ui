// @flow

import * as React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';

import type { Asset, StatusMessage }   from 'app/types/index';
import TextInput        from '@angelrush/react-components/lib/text-input';
import SelectList       from '@angelrush/react-components/lib/select-list';
import PersonaList      from 'app/components/containers/persona-list';
import SplitContainer   from 'app/components/UI/layout/split-container';
import ButtonContainer  from 'app/components/UI/layout/button-container';
import FormContainer    from 'app/components/UI/layout/form-container';
import SubmitButton     from 'app/components/UI/inputs/submit-button';
import CancelButton     from 'app/components/UI/inputs/cancel-button';

const Fragment = React.Fragment;

export type Props = {
  activeAsset: Asset,
  activeAssetLoading: boolean,
  match: Object,
  AppSetActiveAssetLoading: typeof Creators.AppSetActiveAssetLoading,
  statusMessage: StatusMessage,
  APIUpdateAsset: typeof Creators.APIUpdateAsset,
}

export type State = {
  asset: Asset,
  errors: Object,
}

class EditAsset extends React.Component<Props, State> {

  constructor () {
    super();
    this.state = {
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
      errors: {},
    };
  }

  componentDidMount ( ) {
    this.setState( { asset: { ...this.state.asset, ...this.props.activeAsset }  } );
  }

  validateForm = () => {
    let valid = true;
    let newErrors = {};
    if ( ! this.state.asset.asset_type ) {
        valid = false;
        newErrors.asset_type = ['Asset type is required'];
    }
    if ( ! this.state.asset.business_line ) {
        valid = false;
        newErrors.business_line = ['Business Line is required'];
    }
    if ( ! this.state.asset.description ) {
        valid = false;
        newErrors.description = ['Description is required'];
    }
    if ( ! this.state.asset.path ) {
        valid = false;
        newErrors.path = ['Path is required'];
    }
    if ( ! this.state.asset.version ) {
        valid = false;
        newErrors.version = ['Version is required'];
    }
    if ( ! this.state.asset.url ) {
      valid = false;
      newErrors.url = ['URL is required'];
    }
    if ( ! this.state.asset.test_id ) {
      valid = false;
      newErrors.test_id = ['Test ID is required'];
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
      this.props.APIUpdateAsset( this.state.asset );
    }
  };

  renderForm () {
    const assetTypes: Array<Object> = [
      { title: 'survey', value: 'SURVEY' },
      { title: 'static', value: 'STATIC' }
    ];
    const businessLines: Array<Object> = [
      { title: 'demo', value: 'demo' }
    ];

    return (
      <Fragment>
        <SplitContainer>
          <article>
            <label className={ 'label' }>Asset Type</label>
            <SelectList
              value={ this.state.asset.asset_type }
              data={ assetTypes }
              onChange={ ( event: SyntheticInputEvent<HTMLSelectElement> ) => this.setState({ asset: { ...this.state.asset, 'asset_type': event.toString() } }) } />
          </article>
          <article>
            <label className={ 'label' }>Business Line</label>
            <SelectList
              value={ this.state.asset.business_line }
              data={ businessLines }
              onChange={ ( event: SyntheticInputEvent<HTMLSelectElement> ) => this.setState({ asset: { ...this.state.asset, 'business_line': event.toString() } }) } />
          </article>
        </SplitContainer>
        <SplitContainer>
        <TextInput
          label={ 'Path' }
          maxLength='18'
          value={ this.state.asset.path }
          error={ this.state.errors.path }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ asset: { ...this.state.asset, 'path': event.target.value } }) } />
        <TextInput
          label={ 'Version' }
          maxLength='7'
          value={ this.state.asset.version }
          error={ this.state.errors.version }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ asset: { ...this.state.asset, 'version': event.target.value } }) } />
        </SplitContainer>
        <TextInput
          label={ 'Description' }
          value={ this.state.asset.description }
          error={ this.state.errors.description }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ asset: { ...this.state.asset, 'description': event.target.value } }) } />
        <TextInput
          label={ 'URL' }
          value={ this.state.asset.url }
          error={ this.state.errors.url }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ asset: { ...this.state.asset, 'url': event.target.value } }) } />
        <TextInput
          label={ 'Test ID' }
          maxLength='10'
          className={ 'sm' }
          value={ this.state.asset.test_id }
          error={ this.state.errors.test_id }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ asset: { ...this.state.asset, 'test_id': event.target.value } }) } />
        <TextInput
          label={ 'Proof URL' }
          className={ 'last' }
          value={ this.state.asset.proof_url || '' }
          error={ this.state.errors.proof_url }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ asset: { ...this.state.asset, 'proof_url': event.target.value } }) } />

          {
            this.props.activeAsset.personas ?
              <PersonaList personas={ this.props.activeAsset.personas } />
              :
              'There are no personas for this asset'
          }
        <ButtonContainer>
          <SubmitButton onClick={ this.submitForm }>Save</SubmitButton>
          <Link to={ '/assets/all' }>
            <CancelButton>Cancel</CancelButton>
          </Link>
        </ButtonContainer>
      </Fragment>
    );
  }

  render () {
    return (
      <Container>
        { this.renderForm() }
      </Container>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    activeAssetLoading: state.app.activeAssetLoading,
    statusMessage: state.app.statusMessage,
    activeAsset: state.app.activeAsset
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

const Container = FormContainer.extend``;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( EditAsset );

