// @flow

import styled from 'styled-components';
import { breakPoints } from 'app/themes';
import { shadowMixin } from 'app/themes/mixins';

const BaseButton = styled.button`
  display: block;
  padding: 8px;
  font-size: ${ props => props.theme.type.lg.subtitle };
  background-color: whitesmoke;
  border: 1px solid grey;
  border-radius: 2px;
  color: ${ props => props.theme.color };
  transition: background-color 300ms;
  outline: none;
  user-select: none;
  
  @media (max-width: 520px) {
    font-size: ${ props => props.theme.type.sm.subtitle };
  }
  
  &:hover {
    background-color: ${ props => props.theme.buttonHover };
  }
  
  &:active {
    
  }
`;

export default BaseButton;