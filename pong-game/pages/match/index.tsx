import GameFrame from '@/components/Game/Match/\bGameFrame'
import GameScore from '@/components/Game/Match/GameScore'
import PageTitle from '@/components/UI/PageTitle'
import { gameSocket } from '@/socket/gameSocket'
import { useEffect } from 'react'

export default function Game() {
  const scoreHandler = (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    gameSocket.on('matchScore', scoreHandler)
  }, [])
  return (
    <>
      <PageTitle title={'Match'} subTitle={'상대방과 Pong Game을 진행합니다.'} />
      <GameScore />
      <GameFrame />
    </>
  )
}
