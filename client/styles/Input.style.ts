import styled from 'styled-components';
import { mainTheme } from './Themes';

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
  width: 100%;
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

export const checkbox = styled.input`
  display: none;

  &:checked + label {
    background: $color-light-gray;
  }

  &:checked + label:after {
    left: calc(100% - 0.3125rem);
    transform: translateX(-100%);
  }
`;

export const checkbox_label = styled.label`
  cursor: pointer;
  text-indent: 3.9375rem;
  line-height: 1.8;
  border: $border;
  width: 3.375rem;
  height: 1.75rem;
  background: ${(props) => props.theme['color-light-gray']};
  display: block;
  border-radius: 6.25rem;
  position: relative;
  white-space: nowrap;

  &:after {
    content: '';
    position: absolute;
    top: 0.3125rem;
    left: 0.3125rem;
    width: 1rem;
    height: 1rem;
    background: ${(props) => props.theme['color-light-gray']};
    border-radius: 5.625rem;
    transition: 0.3s;
  }

  &:hover {
    border: ${mainTheme['border-hover']};
  }
`;
