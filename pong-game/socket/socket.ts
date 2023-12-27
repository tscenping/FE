import { io } from 'socket.io-client'

const channelsSocketUrl = process.env.NEXT_PUBLIC_API_CHANNELS_SOCKET_ENDPOINT

export let socket = io(channelsSocketUrl, {
  autoConnect: false, // true가 기본
  reconnection: false, // true가 기본 
  randomizationFactor: 1, // 0.5가 기본
  withCredentials: true,
})
