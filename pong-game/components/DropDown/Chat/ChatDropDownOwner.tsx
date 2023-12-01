import ChatBen from '../Function/ChatBen'
import ChatEditAdmin from '../Function/ChatEditAdmin'
import ChatKick from '../Function/ChatKick'
import ChatMute from '../Function/ChatMute'

interface ChatDropDownOwnerProps {
  channelUserType: 'OWNER' | 'ADMIN' | 'COMMON'
  channelUserId: number
  nickname: string
}

export default function ChatDropDownOwner(props: ChatDropDownOwnerProps) {
  return (
    <>
      {/* {channelUserType == 'ADMIN' ? <button>관리자 해제</button> : <button>관리자 임명</button>} */}
      <ChatEditAdmin channelUserType={props.channelUserType} channelUserId={props.channelUserId} nickname={props.nickname}/>
      <ChatKick />
      <ChatMute />
      <ChatBen />
    </>
  )
}
