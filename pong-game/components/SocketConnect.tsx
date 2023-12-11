import { useEffect } from 'react'
import { socket } from '@/socket/socket'

function SocketConnect() {
  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])
  return <></>
}

export default SocketConnect
