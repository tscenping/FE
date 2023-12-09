import { useEffect } from 'react'
import '@/styles/globals.css'
import { Reset } from 'styled-reset'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout'
import ModalLayout from '@/components/Layout/ModalLayout'
import LoginCheck from '@/components/LoginCheck'
import SocketConnect from '@/components/SocketConnect'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <LoginCheck>
        <Layout>
          <SocketConnect />
          <Component {...pageProps} />
        </Layout>
      </LoginCheck>
      <ModalLayout />
    </>
  )
}
