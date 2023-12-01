import BasicPongGame from '@/components/Game/BasicPongGame'
import GameScore from '@/components/Game/GameScore'
import PageTitle from '@/components/UI/PageTitle'

export default function Game() {
  return (
    <>
      <PageTitle title={'Match'} subTitle={'상대방과 Pong Game을 진행합니다.'} />
      <GameScore />
      <BasicPongGame />
    </>
  )
}
