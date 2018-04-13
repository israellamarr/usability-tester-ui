// @flow

import styled from 'styled-components';

const MessageContainer = styled.div`
  color: ${ props => props.theme.type.successColor };
  padding: 8px;
  font-size: ${ props => props.theme.type.lg.h3 };
  &.error {
    color: ${ props => props.theme.type.errorColor };
  }
  
  @media (max-width: 520px) {
    font-size: ${ props => props.theme.type.sm.h3 };
  }
`;

export default MessageContainer;