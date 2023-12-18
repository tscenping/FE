import ChatBan from '../Function/ChatBan'
import ChatKick from '../Function/ChatKick'
import ChatMute from '../Function/ChatMute'
import EditFriend from '../Function/EditFriend'
import EditBlock from '../Function/EditBlock'
import InviteGame from '../Function/InviteGame'
import DirectMsg from '../Function/DirectMsg'
import OpenProfile from '../Function/OpenProfile'

interface ChatDropDownOwnerProps {
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  channelUserId: number
  nickname: string
  setIsDropDownView: (v: boolean) => void
}

export default function ChatDropDownAdmin(props: ChatDropDownOwnerProps) {
  return (
    <>
      {props.channelUserType === 'MEMBER' && (
        <>
          <ChatKick
            channelUserType={props.channelUserType}
            channelUserId={props.channelUserId}
            nickname={props.nickname}
          />
          <ChatMute channelUserId={props.channelUserId} />
          {/* <ChatBan channelUserId={props.channelUserId} /> */}
        </>
      )}
      {/* <EditFriend isFriend={props.isFriend} /> */}
      {/* <EditBlock isBlocked={props.isBlocked} /> */}
      {/* <OpenProfile nickname={props.nickname} setIsDropDownView={props.setIsDropDownView} /> */}
      {/* <InviteGame /> */}
      {/* <DirectMsg /> */}
    </>
  )
}
