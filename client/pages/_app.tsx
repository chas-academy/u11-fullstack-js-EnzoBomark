import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import GlobalStyle from '../styles/Global.style';
import Head from 'next/head';
import Main from '../components/Layout/Main';

const METADATA = () => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8" />
      <title>Your page title</title>
      <meta name="description" content="An example of a meta description." />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.documentElement.lang = 'en-us';
  });
  return (
    <>
      <GlobalStyle />
      <METADATA />
      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  );
};

export default MyApp;
