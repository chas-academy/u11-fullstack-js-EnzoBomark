import styled from 'styled-components';
import { mainTheme } from './Themes';

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
  border: ${mainTheme['border-sm']};
  border-radius: ${mainTheme['rounded-sm']};
  font-size: ${mainTheme['font-sm']};
  cursor: text;
  margin-top: 1.875rem;
  padding: 0 1.25rem;
  box-shadow: ${mainTheme['box-shadow']};
  text-shadow: ${mainTheme['text-shadow']};

  &:hover {
    border: ${mainTheme['border-hover']};
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
  text-shadow: ${mainTheme['text-shadow']};
`;

export const Submit = styled.button`
  background: ${(props) => props.theme['color-dark-gray']};
  color: ${(props) => props.theme['color-white']};
  width: 75%;
  height: 3.75rem;
  max-width: 20rem;
  margin-top: 6.25rem;
  border: none;
  border-radius: ${mainTheme['rounded-md']};
  text-shadow: ${mainTheme['text-shadow']};
  box-shadow: ${mainTheme['box-shadow']};
  cursor: pointer;
`;
