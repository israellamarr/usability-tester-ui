// @flow

import styled from 'styled-components';
import BaseButton from 'app/components/UI/inputs/base-button';

const CancelButton = BaseButton.extend`
  color: white;
  font-size: ${ props => props.theme.type.lg.subtitle };
  background-color: ${ props => props.theme.buttonActionCancel };
  border: none;
  width: 100%;
  &:hover {
    background-color: ${ props => props.theme.buttonActionCancelHover };
  }
  
  @media (max-width: 520px) {
    font-size: ${ props => props.theme.type.sm.subtitle };
  }
`;

export default CancelButton;