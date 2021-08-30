import styled from 'styled-components';

const Nav = styled.a`
  font-size: ${(props) => props.theme['font-sm']};
  color: ${(props) => props.theme['color-white']};
  opacity: 50%;
  margin: 0.5rem 1.25rem;
  padding: 0.625rem 0.9375rem;
  text-decoration: none;
  text-shadow: ${(props) => props.theme['text-shadow']};
  cursor: pointer;

  &[aria-current] {
    opacity: 100%;
  }
`;

export const S = {
  Nav,
};
