// @flow

import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  font-size: ${ props => props.theme.type.lg.h1 };
  @media (max-width: 520px) {
    font-size: ${ props => props.theme.type.sm.h1 };
    margin-bottom: 6px;
  }
  
  & > a,
  & > span {
    margin-right: auto;
  }
`;

export default HeaderContainer;