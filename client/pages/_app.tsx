import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import { mainTheme } from '@/styles/Themes';
import GlobalStyle from '@/styles/Global.style';
import Main from '@/components/layout/Main';
import Head from 'next/head';
import '@/styles/_font.css';

import { wrapper } from '@/store/index';

const METADATA = () => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8" />
      <title>U11</title>
      <meta name="description" content="An example of a meta description." />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CookiesProvider>
      <ThemeProvider theme={mainTheme}>
        <METADATA />
        <GlobalStyle />
        <div id="portal" />
        <Main>
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default wrapper.withRedux(MyApp);
