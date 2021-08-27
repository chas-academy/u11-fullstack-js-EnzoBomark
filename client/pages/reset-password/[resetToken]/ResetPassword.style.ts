import styled from 'styled-components';

const ResetPassword = styled.div`
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

export const S = {
  ResetPassword,
  H1,
  H2,
};
