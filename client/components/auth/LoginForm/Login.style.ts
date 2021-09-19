import styled from 'styled-components';
import { mainTheme } from '@/styles/Themes';

const P = styled.p`
  max-width: 25rem;
  width: 75%;
  margin-top: 1.25rem;
`;

const A = styled.a`
  display: flex;
  justify-content: flex-end;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['color-dark-white']};
  font-size: ${mainTheme['font-sm']};
  cursor: pointer;
`;

export const S = {
  P,
  A,
};
