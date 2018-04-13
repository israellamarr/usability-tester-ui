// @flow

import styled from 'styled-components';
import BaseButton from 'app/components/UI/inputs/base-button';

const SubmitButton = BaseButton.extend`
  color: white;
  font-size: ${ props => props.theme.type.lg.subtitle };
  background-color: ${ props => props.theme.buttonAction };
  border: none;
  &:hover {
    background-color: ${ props => props.theme.buttonHover };
  }
  
  @media (max-width: 520px) {
    font-size: ${ props => props.theme.type.sm.subtitle };
  }
`;

export default SubmitButton;