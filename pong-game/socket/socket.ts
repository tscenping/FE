import { io } from 'socket.io-client'

export let socket = io('wss://localhost:3000/channels', {
  autoConnect: false,
  withCredentials: true,
})

export let gameSocket = io('wss://localhost:3000/game', {
  autoConnect: false,
  withCredentials: true,
})
