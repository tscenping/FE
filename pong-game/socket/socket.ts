import { io } from 'socket.io-client'

const channelsSocketUrl = process.env.NEXT_PUBLIC_API_CHANNELS_SOCKET_ENDPOINT

export let socket = io(channelsSocketUrl, {
  autoConnect: false,
  // reconnection: true,
  withCredentials: true,
  // timeout: 300000,
})
