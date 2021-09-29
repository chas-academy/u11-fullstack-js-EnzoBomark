import { button } from '../Button.style';
import { mainTheme } from '@/styles/Themes';
import styled from 'styled-components';

const UpdateUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  UpdateUser,
  H1,
  Submit,
};
