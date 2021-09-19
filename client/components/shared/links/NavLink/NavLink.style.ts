import styled from 'styled-components';
import { mainTheme } from '@/styles/Themes';

const Nav = styled.a<{ active: boolean }>`
  font-size: ${mainTheme['font-sm']};
  color: ${(props) => props.theme['color-white']};
  opacity: ${(props) => (props.active ? '100%' : '50%')};
  margin: 0.5rem 1.25rem;
  padding: 0.625rem 0.9375rem;
  text-decoration: none;
  text-shadow: ${mainTheme['text-shadow']};
  cursor: pointer;
`;

export const S = {
  Nav,
};
