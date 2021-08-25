import styled from 'styled-components';

const Nav = styled.a`
  font-size: 0.875rem;
  color: #ffffff;
  opacity: 70%;
  margin: 1.5rem 2rem;
  padding: 0.625rem 0.9375rem;
  border-radius: 0.625rem;
  text-decoration: none;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.27);
  cursor: pointer;

  &[aria-current] {
    background-color: #2f363d;
    color: #ffffff;
    opacity: 100%;
    box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.2);
  }
`;

export const S = {
  Nav,
};
