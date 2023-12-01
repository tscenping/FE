import Image from "next/image"

interface GameScoreProps {
  rivalScore?: number
  rivalNickname?: string
  rivalAvatar?: string
  myScore?: number
}
export default function GameScore(props: GameScoreProps) {
  return (<>
  <div>
    <Image src={props.rivalAvatar} alt={'rivalAvatar'} />
  </div>
  </>)
}