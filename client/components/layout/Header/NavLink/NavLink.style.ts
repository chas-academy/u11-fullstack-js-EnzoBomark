import styled from 'styled-components';

const Nav = styled.a`
  font-size: 0.875rem;
  color: #ffffff;
  opacity: 50%;
  margin: 1.5rem;
  padding: 0.625rem 0.9375rem;
  border-radius: 0.625rem;
  text-decoration: none;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.27);
  cursor: pointer;

  &[aria-current] {
    color: #ffffff;
    opacity: 100%;
  }
`;

export const S = {
  Nav,
};
