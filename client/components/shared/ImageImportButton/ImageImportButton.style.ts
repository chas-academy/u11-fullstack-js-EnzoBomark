import styled from 'styled-components';

const ImageImportButton = styled.input``;

const Label = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme['color-dark-gray']};
  color: #ffffff;
  height: 3.75rem;
  width: 100%;
  max-width: 3.75rem;
  border: ${(props) => props.theme['border-sm']};
  border-radius: ${(props) => props.theme['rounded-sm']};
  font-size: ${(props) => props.theme['font-sm']};
  cursor: pointer;
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

const Active = styled.p`
  opacity: 100%;
`;

const Inactive = styled.p`
  opacity: 50%;
`;

export const S = {
  ImageImportButton,
  Label,
  Active,
  Inactive,
};
