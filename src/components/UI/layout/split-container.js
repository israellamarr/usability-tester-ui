// @flow

import styled from 'styled-components';

const SplitContainer = styled.section`
  display: grid;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  @media (max-width: 520px) {
    grid-template-columns: 100%;  
  }
`;

export default SplitContainer;
