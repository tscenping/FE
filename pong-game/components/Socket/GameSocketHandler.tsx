import { gameSocket } from '@/socket/gameSocket'
import { useEffect } from 'react'

export default function GameSocketHandler() {
  useEffect(() => {
    gameSocket.connect()

    gameSocket.on('connect', () => {
      console.log('game connect')
    })

    return () => {
      gameSocket.disconnect()
      gameSocket.off('connect')
    }
  }, [gameSocket])
  return <></>
}
