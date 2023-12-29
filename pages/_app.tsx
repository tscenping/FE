import '@/styles/globals.css'
import { Reset } from 'styled-reset'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout'
import ModalLayout from '@/components/Layout/ModalLayout'
import LoginCheck from '@/components/LoginCheck'
import SocketConnect from '@/components/SocketConnect'
import { Toaster } from 'react-hot-toast'
import Loding from '@/components/Loding/Loding'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useErrorCheck } from '@/store/login'
import ApiErrorCheck from '@/components/Error/ApiErrorCheck'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const { duplicateLoginError, apiError } = useErrorCheck()

  return (
    <>
      <Reset />
      <LoginCheck>
        <QueryClientProvider client={queryClient}>
          <ApiErrorCheck />
          <Loding />
          {!duplicateLoginError && !apiError ? (
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
          ) : (
            <Component {...pageProps} />
          )}
        </QueryClientProvider>
      </LoginCheck>
      <ModalLayout />
    </>
  )
}
