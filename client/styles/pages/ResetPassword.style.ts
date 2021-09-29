import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

import { button } from '../Button.style';

const ResetPassword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.div`
  margin-top: 5rem;
  font-size: ${mainTheme['font-lg']};
  font-weight: 600;
`;

const H2 = styled.div`
  color: ${(props) => props.theme['color-dark-white']};
  margin-top: 0.5rem;
  font-size: ${mainTheme['font-sm']};
`;

const Submit = styled(button)`
  margin-top: 6.25rem;
`;

export const S = {
  ResetPassword,
  H1,
  H2,
  Submit,
};
