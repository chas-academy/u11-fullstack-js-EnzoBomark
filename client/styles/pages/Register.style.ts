import styled from 'styled-components';
import { mainTheme } from '@/styles/Themes';
import { button } from '../Button.style';

const Register = styled.div`
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

const P = styled.p`
  color: ${(props) => props.theme['color-dark-white']};
  margin-top: 1rem;
  font-size: ${mainTheme['font-sm']};
`;

const A = styled.a`
  color: ${(props) => props.theme['color-white']};
  margin-left: 0.5rem;
  font-size: ${mainTheme['font-sm']};
  cursor: pointer;
`;

const Submit = styled(button)`
  margin-top: 6.25rem;
`;

export const S = {
  Register,
  H1,
  H2,
  P,
  A,
  Submit,
};
