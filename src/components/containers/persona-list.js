// @flow

import * as React from "react";
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';
import MdAdd from 'react-icons/lib/md/add';
import MdEdit from 'react-icons/lib/md/edit';
import MdDelete from 'react-icons/lib/md/delete';

import type { Persona } from 'app/types/index';
import { breakPoints }  from 'app/themes';

export type Props = {
  activeAssetID: string,
  personas: Array<Persona>,
  AppSetActiveAssetLoading: typeof Creators.AppSetActiveAssetLoading,
  AppGetPersonaFromActiveAsset: typeof Creators.AppGetPersonaFromActiveAsset,
  APIDeletePersona: typeof Creators.APIDeletePersona
}

export type State = {

}

class PersonaList extends React.Component<Props, State> {

  constructor ( ) {
    super();
  }

  deletePersona = ( personaId: string ) => {
    if ( window.confirm( 'Are you sure you want to delete this persona?' ) ) {
      this.props.APIDeletePersona( personaId );
    }
  };

  render () {
    let { personas } = this.props;
    return (
      <section>
        <PersonasContainer>
          <PersonasHeader>
            <span>Personas </span>
            <Link to={ `/persona/${ this.props.activeAssetID }/add` }><LinkAction><MdAdd /></LinkAction></Link>
          </PersonasHeader>
          {
            personas ?
              personas.map( ( persona, index ) => (
                  (
                    <Personas key={ persona.persona_id }>
                      { persona.persona_name }
                      <Link to={ `/persona/${ this.props.activeAssetID }/${ persona.persona_id }` }><LinkAction><MdEdit size={ 18 } /></LinkAction></Link>
                      <LinkAction onClick={ () => this.deletePersona( persona.persona_id ) }><MdDelete size={ 18 } /></LinkAction>
                    </Personas>
                  )
                )
              )
              :
              'There are no personas for this asset'
          }
        </PersonasContainer>
      </section>
    );
  }
}

const PersonasContainer = styled.article`
  font-size: ${ props => props.theme.type.lg.content };
  margin-bottom: 2rem;
  & a {
    width: auto!important;
  }
  
  @media (max-width: ${ breakPoints.md }) {
    font-size: ${ props => props.theme.type.sm.content };
  }
`;

const PersonasHeader = styled.h3`
  display: flex;
  align-items: center;
  font-size: ${ props => props.theme.type.lg.h3 };
  & > a > div {
    font-size: ${ props => props.theme.type.lg.h3 };
  }
  @media (max-width: ${ breakPoints.md }) {
    font-size: ${ props => props.theme.type.sm.h3 };
    & > a > div {
      font-size: ${ props => props.theme.type.sm.h3 };
    }
  }
`;

const Personas = styled.section`
  display: flex;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const LinkAction = styled.div`
  font-size: 16px;
  width: 2em;
  height: 1.25em;
  display: inline-flex;
  border-radius: 3px;
  padding: 0;
  margin-left: 4px;
  align-items: center;
  justify-content: center;
  color: ${ props => props.theme.assetLinkHoverBG };
  transition: 100ms;
  transition-property: color;
  &:hover {
    cursor: pointer;
    color: ${ props => props.theme.assetLinkBG };
  }

`;

const mapStateToProps = ( state ) => {
  return {
    activeAssetID: state.app.activeAssetID
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( PersonaList );