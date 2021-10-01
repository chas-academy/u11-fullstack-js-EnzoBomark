import styled from 'styled-components';

import { mainTheme } from '../Themes';

const Editor = styled.div``;
const Submit = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
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
`;

export const S = { Editor, Submit };
