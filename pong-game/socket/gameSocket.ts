import { io } from 'socket.io-client'

const gameSocketUrl = process.env.NEXT_PUBLIC_API_GAME_SOCKET_ENDPOINT
export let gameSocket = io(gameSocketUrl, {
  autoConnect: false, // true가 기본
  reconnection: false, // true가 기본 
  randomizationFactor: 1, // 0.5가 기본
  withCredentials: true,
})
