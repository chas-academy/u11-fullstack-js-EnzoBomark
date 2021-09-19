import styled from 'styled-components';
import { mainTheme } from './Themes';

export const Button = styled.button`
  background: ${(props) => props.theme['color-dark-gray']};
  color: ${(props) => props.theme['color-white']};
  width: 100%;
  height: 3.75rem;
  max-width: 25rem;
  border: ${(props) => props.theme['border-sm']};
  border-radius: ${mainTheme['rounded-md']};
  text-shadow: ${mainTheme['text-shadow']};
  box-shadow: ${mainTheme['box-shadow']};
  cursor: pointer;
`;

export const RichButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5625rem;
  width: 1.5625rem;
  border-radius: ${(props) => props.theme['rounded-sm']};
  background-color: ${(props) => props.theme['color-light-gray']};
  margin: 0 0.625rem;
  border: ${(props) => props.theme['border-sm']};
  cursor: pointer;
  padding: 0.3125rem;
`;
