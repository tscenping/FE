import ChatBen from './Function/ChatBen'
import ChatKick from './Function/ChatKick'
import ChatMute from './Function/ChatMute'
import EditFriend from './Function/EditFriend'
import EditBlock from './Function/EditBlock'
import InviteGame from './Function/InviteGame'
import DirectMsg from './Function/DirectMsg'
import OpenProfile from './Function/OpenProfile'

interface ChatDropDownOwnerProps {
  channelUserType: 'OWNER' | 'ADMIN' | 'COMMON' | null
  nickname: string
  isFriend: boolean
  isBlocked: boolean
  setIsDropDownView: (v: boolean) => void
}

export default function ChatDropDownAdmin(props: ChatDropDownOwnerProps) {
  return (
    <>
      {props.channelUserType === 'COMMON' && (
        <>
          <ChatKick />
          <ChatMute />
          <ChatBen />
        </>
      )}
      <EditFriend isFriend={props.isFriend} />
      <EditBlock isBlocked={props.isBlocked} />
      <OpenProfile nickname={props.nickname} setIsDropDownView={props.setIsDropDownView} />
      <InviteGame />
      <DirectMsg />
    </>
  )
}
