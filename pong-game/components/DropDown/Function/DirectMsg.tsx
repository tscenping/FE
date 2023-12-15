import { useModalState } from '@/store/store'
import { useReadyToChannel } from '@/store/chat'

interface DirectMsgProps {
  setIsDropDownView: (v: boolean) => void
  avatar: string
  nickname: string
  userId: number
}

export default function DirectMsg(props: DirectMsgProps) {
  const { setModalName, setModalProps } = useModalState()
  const { setDmAvatar, setTitle, setReadyChannelId } = useReadyToChannel()
  const createDmHandler = () => {
    props.setIsDropDownView(false)
    setReadyChannelId(props.userId)
    setDmAvatar(props.avatar)
    setTitle(props.nickname)
    setModalProps({ modalType: 'DM' })
    setModalName('joinDmRoom')
  }

  return (
    <li>
      <button onClick={createDmHandler}>1:1메세지</button>
    </li>
  )
}
