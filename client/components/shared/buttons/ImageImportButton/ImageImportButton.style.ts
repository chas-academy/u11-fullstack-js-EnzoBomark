import { RichButton } from '@/styles/Button.style';
import { mainTheme } from '@/styles/Themes';
import styled from 'styled-components';

const ImageImportButton = styled.input``;

const Label = styled.label<{ active: string }>`
  font-size: ${mainTheme['font-sm']};
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.75rem;
  max-width: 25rem;
  background-color: ${(props) => props.theme['color-dark-gray']};
  opacity: ${(props) => (props.active.length ? '100%' : '50%')};
  border: ${(props) => props.theme['border-sm']};
  color: ${(props) => props.theme['color-white']};
  border-radius: ${mainTheme['rounded-md']};
  text-shadow: ${mainTheme['text-shadow']};
  box-shadow: ${mainTheme['box-shadow']};
  cursor: pointer;
`;

export const S = {
  ImageImportButton,
  Label,
};
