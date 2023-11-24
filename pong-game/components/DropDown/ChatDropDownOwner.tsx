import ChatBen from "./Function/ChatBen";
import ChatEditAdmin from "./Function/ChatEditAdmin";
import ChatKick from "./Function/ChatKick";
import ChatMute from "./Function/ChatMute";

interface ChatDropDownOwnerProps {
  channelUserType: 'OWNER' | 'ADMIN' | 'COMMON'
}

export default function ChatDropDownOwner({ channelUserType }: ChatDropDownOwnerProps) {
  return (
    <>
          {/* {channelUserType == 'ADMIN' ? <button>관리자 해제</button> : <button>관리자 임명</button>} */}
          <ChatEditAdmin channelUserType={channelUserType}/>
          <ChatKick/>
          <ChatMute/>
          <ChatBen/>
    </>
  )
}