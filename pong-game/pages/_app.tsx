import '@/styles/globals.css'
import { Reset } from 'styled-reset'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
