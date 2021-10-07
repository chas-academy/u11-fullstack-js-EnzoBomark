import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

const ImageImportButton = styled.input``;

const Label = styled.label<{ active: string }>`
  position: absolute;
  bottom: 14.375rem;
  right: 90px;
  font-size: ${mainTheme['font-xs']};
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme['color-dark-gray']};
  border: ${(props) => props.theme['border-sm']};
  color: ${(props) => props.theme['color-white']};
  border-radius: ${mainTheme['rounded-lg']};
  text-shadow: ${mainTheme['text-shadow']};
  box-shadow: ${mainTheme['box-shadow']};
  cursor: pointer;
  opacity: ${(props) => (props.active ? '100%' : '50%')};
`;

export const S = {
  ImageImportButton,
  Label,
};
