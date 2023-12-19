import { useModalState, useResponseModalState } from '@/store/store'
import { instance } from '@/util/axios'

interface ChatMuteProps {
  channelUserId: number
  nickname: string
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
}

export default function ChatMute(props: ChatMuteProps) {
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()
  const chatUserMuteHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    try {
      await instance
        .patch(`/channels/mute`, {
          channelUserId: props.channelUserId,
        })
        .then(function (res) {
          console.log(res)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  const setMuteModal = () => {
    setModalName('response')
    responseModal.setResponseModalState(
      '유저 뮤트',
      `${props.nickname}님을 뮤트 하시겠습니까?`,
      chatUserMuteHandler,
    )
  }

  return (
    <li>
      <button onClick={setMuteModal}>채팅금지</button>
    </li>
  )
}
