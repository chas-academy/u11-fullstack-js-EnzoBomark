import styled from 'styled-components';
import { mainTheme } from '@/styles/Themes';
import { button } from '../Button.style';

const DeleteUser = styled.div`
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
  margin-top: 1.875rem;
`;

export const S = {
  DeleteUser,
  H1,
  Submit,
};
