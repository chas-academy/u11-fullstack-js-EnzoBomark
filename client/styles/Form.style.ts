import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & .error {
    border: ${(props) => props.theme['border-error']};
  }
`;

export const Label = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 0.0625rem;
  margin: -0.0625rem;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 0.0625rem;
`;

export const Input = styled.input`
  position: relative;
  display: flex;
  background: ${(props) => props.theme['color-dark-gray']};
  color: #ffffff;
  height: 3.75rem;
  width: 75%;
  max-width: 25rem;
  border: ${(props) => props.theme['border-sm']};
  border-radius: ${(props) => props.theme['rounded-sm']};
  font-size: ${(props) => props.theme['font-sm']};
  cursor: text;
  margin-top: 1.875rem;
  padding: 0 1.25rem;
  box-shadow: ${(props) => props.theme['box-shadow']};
  text-shadow: ${(props) => props.theme['text-shadow']};

  &:hover {
    border: ${(props) => props.theme['border-hover']};
  }

  &:focus {
    outline: none;
  }
`;

export const Error = styled.span`
  color: ${(props) => props.theme['color-error']};
  margin-top: 1rem;
  text-align: center;
  width: 70%;
  text-shadow: ${(props) => props.theme['text-shadow']};
`;

export const Submit = styled.button`
  background: ${(props) => props.theme['color-dark-gray']};
  color: ${(props) => props.theme['color-white']};
  width: 75%;
  height: 3.75rem;
  max-width: 20rem;
  margin-top: 6.25rem;
  border: none;
  border-radius: ${(props) => props.theme['rounded-md']};
  text-shadow: ${(props) => props.theme['text-shadow']};
  box-shadow: ${(props) => props.theme['box-shadow']};
  cursor: pointer;
`;
