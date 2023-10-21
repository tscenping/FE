import '@/styles/globals.css'
import { Reset } from 'styled-reset'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps, router }: AppProps) {
  const loginPage = router.pathname === '/login'
  return (
    <>
      <Reset />
      {loginPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  )
}
