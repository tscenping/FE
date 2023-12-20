import { gameSocket } from '@/socket/gameSocket'
import { useRouter, NextRouter } from 'next/router'
import { useEffect } from 'react'

export default function GameSocketHandler() {
  const router: NextRouter = useRouter()
  useEffect(() => {
    if ( router.pathname === '/match'){
      gameSocket.connect()
      gameSocket.emit('gameRequest')

      // gameSocket.on('connect', () => {
      //   console.log('game connect')
      // })

    }
    return () => {
      gameSocket.disconnect()

    }
  }, [gameSocket, router.pathname])
  return <></>
}
