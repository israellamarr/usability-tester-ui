// @flow

import styled from 'styled-components';

const ButtonContainer = styled.section`
  display: grid;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  @media (max-width: 520px) {
    grid-template-columns: 100%;
    grid-template-rows: 32px 32px;  
    grid-row-gap: 4px;  
    align-items: center;
    justify-content: center;
  }
`;

export default ButtonContainer;
