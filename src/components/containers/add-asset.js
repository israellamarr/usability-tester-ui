// @flow

import * as React from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';
import FormContainer from 'app/components/UI/layout/form-container';

import type { Asset, StatusMessage } from 'app/types/index';
import TextInput                     from '@angelrush/react-components/lib/text-input';
import SelectList                    from '@angelrush/react-components/lib/select-list';
import SplitContainer from 'app/components/UI/layout/split-container';
import SubmitButton from 'app/components/UI/inputs/submit-button';
import CancelButton from 'app/components/UI/inputs/cancel-button';
import ButtonContainer from 'app/components/UI/layout/button-container';

export type Props = {
  asset: Asset,
  statusMessage: StatusMessage,
  APIAddAsset: typeof Creators.APIAddAsset
}

export type State = {
  asset: Asset,
  errors: Object,
}

class AddAsset extends React.Component<Props, State> {

  constructor () {
    super();
    this.state = {
      asset: {
        asset_id: '',
        asset_type: 'survey',
        business_line: 'beatpain',
        description: '',
        path: '',
        test_id: '',
        url: '',
        version: '',
        personas: []
      },
      errors: {},
    };
  }

  componentDidMount = () => {

  };

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
      this.props.APIAddAsset( this.state.asset );
    }
  };

  render () {
    const assetTypes: Array<Object> = [
      { title: 'survey', value: 'SURVEY' },
      { title: 'static', value: 'STATIC' }
    ];
    const businessLines: Array<Object> = [
      { title: 'demo', value: 'demo' }
    ];

    return (
      <Container>
        <SplitContainer>
          <article>
            <label className={ 'label' }>Asset Type</label>
            <SelectList
              value={ this.state.asset.asset_type }
              data={ assetTypes }
              onChange={ ( event: SyntheticInputEvent<HTMLSelectElement> ) => this.setState({ asset: { ...this.state.asset, 'asset_type': event.target.value } }) } />
          </article>
          <article>
            <label className={ 'label' }>Business Line</label>
            <SelectList
              value={ this.state.asset.business_line }
              data={ businessLines }
              onChange={ ( value: string ) => this.setState({ asset: { ...this.state.asset, 'business_line': value } }) } />
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
          className={ 'sm last' }
          value={ this.state.asset.test_id }
          error={ this.state.errors.test_id }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ asset: { ...this.state.asset, 'test_id': event.target.value } }) } />
        <ButtonContainer>
          <SubmitButton onClick={ this.submitForm }>Add</SubmitButton>
          <Link to={ '/assets/all' }>
            <CancelButton>
              Cancel
            </CancelButton>
          </Link>
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = FormContainer.extend`
  
`;

const mapStateToProps = ( state ) => {
  return {
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( AddAsset ) );

