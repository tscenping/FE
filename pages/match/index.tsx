import GameFrame from '@/components/Game/Match/\bGameFrame'
import GameScore from '@/components/Game/Match/GameScore'
import PageTitle from '@/components/UI/PageTitle'
import { gameSocket } from '@/socket/gameSocket'
import { useMatchGameState } from '@/store/game'
import { useLodingState } from '@/store/loding'
import { useModalState } from '@/store/store'
import { useRouter, NextRouter } from 'next/router'
import { useEffect } from 'react'

export default function Game() {
  const { setLodingState } = useLodingState()
  const { setModalName } = useModalState()
  const router: NextRouter = useRouter()
  const { matchGameState } = useMatchGameState()
  useEffect(() => {
    setLodingState({ isLoding: false })
    setModalName(null)
    console.log(1)
    document.body.style.overflowY = 'hidden'
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (matchGameState.gameId === -1) {
        router.replace('/main')
        console.log('gameId -1')
      }
    }, 500)
  }, [matchGameState.gameId])

  return (
    <>
      <PageTitle title={'Match'} subTitle={'상대방과 Pong Game을 진행합니다.'} />
      <GameScore />
      {/* <GameFrame gameId={matchGameState.gameId} /> */}
      <GameFrame />
    </>
  )
}
