import { useModalState, useResponseModalState } from "@/store/store"
import { instance } from "@/util/axios"

interface ChatEditAdminProps {
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  channelUserId: number
  nickname: string
}

export default function ChatKick(props: ChatEditAdminProps) {
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()

  const setKickHandler = async () => {
    console.log(props.channelUserId)
    await instance.patch('/channels/kick', {
      channelUserId: props.channelUserId
    }).then(function (res) {
      console.log(res)
    })
  }

  const setKickModal = () => {
    setModalName('response')
    responseModal.setResponseModalState('유저 강퇴', `${props.nickname}님을 강퇴 하시겠습니까?`, setKickHandler)
  }
  return (
    <li>
        <button onClick={setKickModal}>강퇴하기</button>
    </li>
  )
}
