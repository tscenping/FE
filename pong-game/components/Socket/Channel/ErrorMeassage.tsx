import { socket } from '@/socket/socket'
import { useEffect } from 'react'

export default function ErrorMeassage() {
  useEffect(() => {
    socket.on('error', (error: any) => {
      console.log(error)
      alert(error.message)
      // socket.disconnect()
    })

    return () => {
      socket.off('error')
    }
  }, [])

  return <></>
}
