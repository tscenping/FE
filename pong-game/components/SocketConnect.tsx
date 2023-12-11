import { useEffect } from 'react'
import { socket, gameSocket } from '@/socket/socket'

function SocketConnect() {
  useEffect(() => {
    socket.connect()
    gameSocket.connect()
    return () => {
      socket.disconnect()
      gameSocket.disconnect()
    }
  }, [])
  return <></>
}

export default SocketConnect
