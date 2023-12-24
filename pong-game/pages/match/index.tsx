import GameFrame from '@/components/Game/Match/\bGameFrame'
import GameScore from '@/components/Game/Match/GameScore'
import PageTitle from '@/components/UI/PageTitle'
import { gameSocket } from '@/socket/gameSocket'
import { useMatchGameState } from '@/store/game'
import { useEffect } from 'react'



export default function Game() {  
  return (
    <>
      <PageTitle title={'Match'} subTitle={'상대방과 Pong Game을 진행합니다.'} />
      <GameScore />
      {/* <GameFrame gameId={matchGameState.gameId} /> */}
      <GameFrame />
    </>
  )
}
