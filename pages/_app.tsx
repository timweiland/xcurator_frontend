import { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css'

import Layout from '../components/Layout/Layout'

function xCuratorApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default xCuratorApp
