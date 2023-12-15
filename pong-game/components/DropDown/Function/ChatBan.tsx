import { useModalState, useResponseModalState } from '@/store/store'
import { instance } from '@/util/axios'
interface ChatBanProps {
  channelUserId: number
  nickname: string
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
}
export default function ChatBan(props: ChatBanProps) {
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()

  const chatUserBanHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    try {
      await instance
        .patch(`/channels/ban`, {
          channelUserId: props.channelUserId,
        })
        .then(function (res) {
          console.log(res)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  const setBanModal = () => {
    setModalName('response')
    responseModal.setResponseModalState(
      '유저 벤',
      `${props.nickname}님을 벤 하시겠습니까?`,
      chatUserBanHandler,
    )
  }
  return (
    <li>
      <button onClick={setBanModal}>벤하기</button>
    </li>
  )
}
