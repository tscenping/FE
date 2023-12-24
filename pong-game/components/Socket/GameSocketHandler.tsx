import { gameSocket } from '@/socket/gameSocket'
import { useRouter, NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useMatchGameState } from '@/store/game'

export default function GameSocketHandler() {
  const router: NextRouter = useRouter()
  const { matchGameState } = useMatchGameState()

  useEffect(() => {
    console.log(matchGameState)
    if (router.pathname === '/match') {
      gameSocket.connect()
      gameSocket.emit('gameRequest', { gameId: matchGameState.gameId })
      // gameSocket.on('connect', () => {
      //   console.log('game connect')
      // })
    }
    return () => {
      gameSocket.disconnect()
    }
  }, [router.pathname])
  return <></>
}
