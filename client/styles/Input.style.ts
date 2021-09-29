import styled from 'styled-components';
import { mainTheme } from './Themes';

export const input_label = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 0.0625rem;
  margin: -0.0625rem;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 0.0625rem;
`;

export const input = styled.input`
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

export const text_area = styled.textarea`
  position: relative;
  display: flex;
  background: ${(props) => props.theme['color-dark-gray']};
  color: #ffffff;
  min-height: 3.75rem;
  width: 100%;
  max-width: 25rem;
  border: ${mainTheme['border-sm']};
  border-radius: ${mainTheme['rounded-sm']};
  font-size: ${mainTheme['font-sm']};
  cursor: text;
  margin-top: 1.875rem;
  padding: 1.25rem;
  box-shadow: ${mainTheme['box-shadow']};
  text-shadow: ${mainTheme['text-shadow']};
  resize: vertical;

  &:hover {
    border: ${mainTheme['border-hover']};
  }

  &:focus {
    outline: none;
  }
`;

export const input_error = styled.span`
  color: ${(props) => props.theme['color-error']};
  margin-top: 1rem;
  text-align: center;
  width: 70%;
  text-shadow: ${mainTheme['text-shadow']};
`;

export const checkbox = styled.div``;
