import ModalPageTitle from "@/components/UI/ModalPageTitle";
import winImg from '@/public/img/modal/gameResultWin.svg'
import { useMatchResultState } from "@/store/game";

export default function GameResult(){
  const {matchResultState} = useMatchResultState()
  return (<>
  <ModalPageTitle title="게임 결과" subTitle="유저들과 대화를 나눌 채팅방을 만들어보세요" />

  </>)
}