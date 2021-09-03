import styled from 'styled-components';

const Topbar = styled.form`
  display: flex;
  justify-content: center;
  width: 85%;
  max-width: 60rem;
  margin-top: 0.625rem;

  @media (max-width: 37.5rem) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

export const S = {
  Topbar,
};
