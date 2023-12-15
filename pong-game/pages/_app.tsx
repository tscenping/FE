import '@/styles/globals.css'
import { Reset } from 'styled-reset'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout'
import ModalLayout from '@/components/Layout/ModalLayout'
import LoginCheck from '@/components/LoginCheck'
import SocketConnect from '@/components/SocketConnect'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <LoginCheck>
        <Layout>
          <SocketConnect />
          <Component {...pageProps} />
          <Toaster
            toastOptions={{
              style: {
                maxWidth: 850,
              },
            }}
          />
        </Layout>
      </LoginCheck>
      <ModalLayout />
    </>
  )
}
