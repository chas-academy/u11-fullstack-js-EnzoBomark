import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5625rem;
  width: 1.5625rem;
  border-radius: ${(props) => props.theme['rounded-sm']};
  background-color: ${(props) => props.theme['color-light-gray']};
  margin: 0 0.625rem;
  border: ${(props) => props.theme['border-sm']};
  cursor: pointer;
`;

export const S = {
  Button,
};
