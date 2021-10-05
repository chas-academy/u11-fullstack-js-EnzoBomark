import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

import { button } from '../../Button.style';

const EmailUser = styled.div`
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

const Submit = styled(button)`
  margin-top: 6.25rem;
`;

export const S = {
  EmailUser,
  H1,
  Submit,
};
