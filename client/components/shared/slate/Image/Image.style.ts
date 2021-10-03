import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

const Image = styled.img`
  width: 91vw;
  max-width: 58rem;
  margin: 1.875rem auto 0 auto;
  border-radius: ${mainTheme['rounded-md']};
  box-shadow: ${mainTheme['box-shadow']};
`;

export const S = {
  Image,
};
