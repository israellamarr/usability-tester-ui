// @flow

import styled from 'styled-components';
import { breakPoints } from 'app/themes';
import { shadowMixin } from 'app/themes/mixins';
import React from 'react';
import MdLeft from 'react-icons/lib/md/chevron-left';
import { withRouter } from 'react-router-dom';

const BackButtonWrapper = styled.div`
  background: ${ props => props.theme.headerBG } none;
  color: ${ props => props.theme.color };
  min-width: 36px;
  max-width: 48px;
  width: ${ props => props.theme.layout.contentMarginVW}vw;
  height: 98%;
  font-size: 12px;
  outline: none;
  background-color: ${ props => props.theme.trimColor };
  border: none;
  transition: box-shadow 200ms;
  margin: 0;  
  padding: 0;  
  display: flex;
  align-items: center;
  justify-content: center;
   
  &:hover {
    border: none;
    background-color: ${ props => props.theme.buttonAction };
    color: white;
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    outline: none;
    box-shadow: none;
    transition: none;
  }
`;


const BackButton = ( props  ) => (
  <BackButtonWrapper onClick={ () => {
    props.history.goBack();
  } } >
    <MdLeft size={ 24 } />
  </BackButtonWrapper>
);

export default withRouter( BackButton );