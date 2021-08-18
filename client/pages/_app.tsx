import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/Global.style'
import Head from 'next/head'
import Main from '../components/Layout/Main'

const METADATA = () => {
  return (
    <Head>
      <title>TITLE</title>
      <meta name="description" content="description" />
    </Head>
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <METADATA />

      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  )
}

export default MyApp
