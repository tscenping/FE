import { useModalState, useResponseModalState } from '@/store/store'
import { instance } from '@/util/axios'

interface ChatEditAdminProps {
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  channelUserId: number
  nickname: string
}

export default function ChatEditAdmin(props: ChatEditAdminProps) {
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()

  const setAdminHandler = async () => {
    console.log(props.channelUserId)
    await instance
      .patch('/channels/admin', {
        channelUserId: props.channelUserId,
      })
      .then(function (res) {
        console.log(res)
        if (props.channelUserType == 'ADMIN'){
          props.channelUserType = 'MEMBER';}
          else {
            props.channelUserType = 'ADMIN'
          }

      })
  }

  const setAdminModal = () => {
    const viewText = props.channelUserType == 'ADMIN' ? '관리자 해제' : '관리자 임명'
    setModalName('response')
    responseModal.setResponseModalState(
      '관리자 임명',
      `${props.nickname}님을 ${viewText} 하시겠습니까?`,
      setAdminHandler,
    )
  }

  return (
    <li>
      {props.channelUserType === 'ADMIN' ? (
        <button onClick={setAdminModal}>관리자 해제</button>
      ) : (
        <button onClick={setAdminModal}>관리자 임명</button>
      )}
    </li>
  )
}
