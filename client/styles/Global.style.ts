import { createGlobalStyle } from 'styled-components';

import { ThemeType } from './Themes';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {} // extends the global DefaultTheme with our ThemeType.
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${(props) => props.theme['color-background']};
    font-family: Open-Sans, Helvetica, Sans-Serif;
    min-height: 100vh;
    color: ${(props) => props.theme['color-white']};
  }
`;

export default GlobalStyle;
