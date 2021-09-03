import styled from 'styled-components';

const TextInput = styled.input`
  position: relative;
  display: flex;
  background: ${(props) => props.theme['color-dark-gray']};
  color: #ffffff;
  height: 3.75rem;
  width: 100%;
  max-width: 50rem;
  border: ${(props) => props.theme['border-sm']};
  border-radius: ${(props) => props.theme['rounded-sm']};
  font-size: ${(props) => props.theme['font-sm']};
  cursor: text;
  margin-top: 1.25rem;
  padding: 0 1.25rem;
  box-shadow: ${(props) => props.theme['box-shadow']};
  text-shadow: ${(props) => props.theme['text-shadow']};
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  &:hover {
    border: ${(props) => props.theme['border-hover']};
  }

  &:focus {
    outline: none;
  }
`;

export const S = {
  TextInput,
};
