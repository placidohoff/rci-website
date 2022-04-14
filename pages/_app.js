import '../styles/globals.css'
import Layout from '../components/Layout'
import Head from 'next/head'
import { StateProvider } from '../redux/StateProvider'
import reducer, { initialState } from '../redux/reducer'

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Layout>
        <Head>
          <title>RCI Electric</title>
          <meta name='keywords' content='Residential Commercial Industrial Electrical Services' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  )
}

export default MyApp
