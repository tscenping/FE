import { useModalState } from '@/store/store'

interface InviteGameProps {
  friendId: number
  nickname: string
  avatar: string
  calledFrom?: 'searchUserList'
  setIsDropDownView: (v: boolean) => void
}

export default function InviteGame(props: InviteGameProps) {
  const { setModalName, setModalProps } = useModalState()
  const gameHandler = () => {
    setModalProps({
      avatar: props.avatar,
      nickname: props.nickname,
      userId: props.friendId,
      gameMode: 'Normal',
    })
    props.setIsDropDownView(false)
    setModalName('inviteGame')
  }
  return (
    <li>
      <button onClick={gameHandler}>게임하기</button>
    </li>
  )
}
