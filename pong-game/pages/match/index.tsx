import GameFrame from '@/components/Game/Match/\bGameFrame'
import GameScore from '@/components/Game/Match/GameScore'
import PageTitle from '@/components/UI/PageTitle'
import { gameSocket } from '@/socket/gameSocket'
import { useMatchGameState } from '@/store/game'
import { useLodingState } from '@/store/loding'
import { useModalState } from '@/store/store'
import { useEffect } from 'react'

export default function Game() {
  const { setLodingState } = useLodingState()
  const { setModalName } = useModalState()
  useEffect(() => {
    setLodingState({ isLoding: false })
    setModalName(null)
    console.log(1)
    document.body.style.overflowY = 'hidden'
    document.body.style.overflowX = 'hidden'
    return ()=>{
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <>
      <PageTitle title={'Match'} subTitle={'상대방과 Pong Game을 진행합니다.'} />
      <GameScore />
      {/* <GameFrame gameId={matchGameState.gameId} /> */}
      <GameFrame />
    </>
  )
}
