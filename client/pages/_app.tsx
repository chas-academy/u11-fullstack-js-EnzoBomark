import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '@/styles/Themes';
import GlobalStyle from '@/styles/Global.style';
import Main from '@/components/layout/Main';
import Head from 'next/head';
import '@/styles/_font.css';

import { createStore, applyMiddleware, Store } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import reducer from '@/store/reducer';
import thunk from 'redux-thunk';

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

const store = createStore(reducer, applyMiddleware(thunk));

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={mainTheme}>
        <METADATA />
        <GlobalStyle />
        <Main>
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default MyApp;
