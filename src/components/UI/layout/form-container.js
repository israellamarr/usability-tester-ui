import styled from 'styled-components';
import { shadowMixin } from 'app/themes/mixins';

const FormContainer = styled.section`
  color: ${ props => props.theme.color };
  border-color: ${ props => props.theme.color };
  border-radius: 3px;
  background-color: ${ props => props.theme.cardBG };
  box-shadow: ${ shadowMixin( 1 ) };
  padding: ${ props => props.theme.layout.contentMarginPx}px;
  transition: 300ms;
  max-width: 712px;
  margin: auto;
  transition-property: background-color, height, width;
  
  input {
    font-size: ${ props => props.theme.type.lg.content };
  }
  
  select {
    font-size: ${ props => props.theme.type.lg.content };
  }
  
  a {
    width: 100%;
  }
  
  .label {
    color: ${ props => props.theme.color };
    font-size: ${ props => props.theme.type.lg.content };
  }
`;

export default FormContainer;