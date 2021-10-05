import styled from 'styled-components';

import { button } from '../../Button.style';
import { mainTheme } from '../../Themes';

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6.25rem;
`;

const H1 = styled.div`
  margin-top: 5rem;
  font-size: ${mainTheme['font-lg']};
  font-weight: 600;
`;

export const S = {
  User,
  H1,
};
