import '@/styles/_font.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import Main from '@/components/layout/Main';
import { wrapper } from '@/store/index';
import GlobalStyle from '@/styles/Global.style';
import { mainTheme } from '@/styles/Themes';

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
    <ThemeProvider theme={mainTheme}>
      <METADATA />
      <GlobalStyle />
      <div id="portal" />
      <Main>
        <Component {...pageProps} />
      </Main>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(MyApp);
