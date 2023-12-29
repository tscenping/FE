import { gameSocket } from '@/socket/gameSocket'
import { useRouter, NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useMatchGameState } from '@/store/game'

export default function GameSocketHandler() {
  const router: NextRouter = useRouter()
  const { matchGameState } = useMatchGameState()

  useEffect(() => {
    // console.log(matchGameState)
    if (router.pathname === '/match' && matchGameState.gameId !== -1) {
      gameSocket.connect()
      gameSocket.on('connect', () => {
        console.log('gameSocket connect')
      })
      gameSocket.on('disconnect', () => {
        console.log('gameSocket disconnect')
        router.replace('/main')
      })

      // gameSocket.emit('gameRequest', { gameId: matchGameState.gameId })
      // gameSocket.on('connect', () => {
      //   console.log('game connect')
      // })
    }
    return () => {
      gameSocket.off('connect')
      gameSocket.off('disconnect')
      gameSocket.disconnect()
    }
  }, [router.pathname])
  return <></>
}
