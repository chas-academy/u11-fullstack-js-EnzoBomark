import styled from 'styled-components';

const SaveButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme['color-dark-gray']};
  color: #ffffff;
  height: 3.9rem;
  width: 100%;
  max-width: 6.5rem;
  border: ${(props) => props.theme['border-sm']};
  border-radius: ${(props) => props.theme['rounded-sm']};
  font-size: ${(props) => props.theme['font-sm']};
  cursor: pointer;
  margin-top: 1.25rem;
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
  SaveButton,
};
