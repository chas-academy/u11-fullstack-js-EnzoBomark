import styled from 'styled-components';

const Register = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.div`
  margin-top: 5rem;
  font-size: ${(props) => props.theme['font-lg']};
  font-weight: 600;
`;

const H2 = styled.div`
  margin-top: 0.5rem;
  font-size: ${(props) => props.theme['font-sm']};
  color: ${(props) => props.theme['color-dark-white']};
`;

const P = styled.p`
  color: ${(props) => props.theme['color-dark-white']};
  margin-top: 1rem;
  font-size: ${(props) => props.theme['font-sm']};
`;

const A = styled.a`
  color: ${(props) => props.theme['color-white']};
  margin-left: 0.5rem;
  font-size: ${(props) => props.theme['font-sm']};
  cursor: pointer;
`;

export const S = {
  Register,
  H1,
  H2,
  P,
  A,
};
