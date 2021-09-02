import { RichButton } from '@/styles/Button.style';
import { mainTheme } from '@/styles/Themes';
import styled from 'styled-components';

const ImageImport = styled.input``;

const Label = styled.label<{ active: string }>`
  height: 3.75rem;
  min-width: 3.75rem;
  font-size: ${mainTheme['font-sm']};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme['rounded-sm']};
  background-color: ${(props) => props.theme['color-light-gray']};
  margin: 0 0.625rem;
  border: ${(props) => props.theme['border-sm']};
  cursor: pointer;
  opacity: ${(props) => (props.active.length ? '100%' : '50%')};
  box-shadow: ${mainTheme['box-shadow']};
`;

export const S = {
  ImageImport,
  Label,
};
