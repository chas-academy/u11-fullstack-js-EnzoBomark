import styled from 'styled-components';
import { mainTheme } from './Themes';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Success = styled.span`
  color: ${(props) => props.theme['color-white']};
  margin-top: 1rem;
  text-align: center;
  width: 70%;
  text-shadow: ${mainTheme['text-shadow']};
`;
