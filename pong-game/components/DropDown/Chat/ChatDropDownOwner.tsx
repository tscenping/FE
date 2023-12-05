import ChatBan from '../Function/ChatBan'
import ChatEditAdmin from '../Function/ChatEditAdmin'
import ChatKick from '../Function/ChatKick'
import ChatMute from '../Function/ChatMute'

interface ChatDropDownOwnerProps {
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  channelUserId: number
  nickname: string
  setIsDropDownView: (v: boolean) => void
  setChannelUserType: (v: 'OWNER' | 'ADMIN' | 'MEMBER') => void
}

export default function ChatDropDownOwner(props: ChatDropDownOwnerProps) {
  return (
    <>
      {/* {channelUserType == 'ADMIN' ? <button>관리자 해제</button> : <button>관리자 임명</button>} */}
      <ChatEditAdmin
        channelUserType={props.channelUserType}
        channelUserId={props.channelUserId}
        nickname={props.nickname}
        setChannelUserType={props.setChannelUserType}
      />
      <ChatKick
        channelUserType={props.channelUserType}
        channelUserId={props.channelUserId}
        nickname={props.nickname}
      />
      <ChatMute channelUserId={props.channelUserId} />
      <ChatBan channelUserId={props.channelUserId} />
    </>
  )
}
