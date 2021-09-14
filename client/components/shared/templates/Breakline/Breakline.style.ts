import { mainTheme } from '@/styles/Themes';
import styled from 'styled-components';

const Breakline = styled.div`
  height: 0.1875rem;
  background-color: ${mainTheme['color-light-gray']};
  box-shadow: ${mainTheme['box-shadow']};
  border-radius: ${mainTheme['rounded-md']};
  margin-top: 1.25rem;
`;

export const S = {
  Breakline,
};
