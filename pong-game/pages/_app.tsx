import { Reset } from 'styled-reset'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout'
import ModalLayout from '@/components/Layout/ModalLayout'
import LoginCheck from '@/components/LoginCheck'
import { useEffect, useState } from 'react'
import SocketIOClient from 'socket.io-client'
import io from 'socket.io-client'

interface userStatusProps{
  userId: number
  status: string
}
export default function App({ Component, pageProps }: AppProps) {
  const userStatusHandler = (userStatus) => {
    console.log(userStatus.userId, userStatus.status)
  }
  useEffect(() => {
    const socket = io('wss://localhost:3000/channels', {
      withCredentials: true,
      autoConnect: true,
      // transports: ['websocket'],
    })
    socket.on('userStatus', (userStatusHandler))
    socket.on('connect', () => {
      console.log('success')
    })
    socket.on('message', (data) => {
      console.log('Received message from server:', data)
    })
    socket.on('ServerToClient', (data) => {
      console.log(data)
    })
    socket.emit('message', {channelId: 1, message: 'zxc'})
    return () => {
      console.log('Disconnecting socket')
      socket.disconnect()
    }
  }, [])
  return (
    <>
      <Reset />
      <LoginCheck>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoginCheck>
      <ModalLayout />
    </>
  )
}
