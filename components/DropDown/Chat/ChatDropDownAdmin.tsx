import ChatBan from '../Function/ChatBan'
import ChatKick from '../Function/ChatKick'
import ChatMute from '../Function/ChatMute'

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
          <ChatMute
            channelUserType={props.channelUserType}
            channelUserId={props.channelUserId}
            nickname={props.nickname}
          />
          <ChatBan
            channelUserType={props.channelUserType}
            channelUserId={props.channelUserId}
            nickname={props.nickname}
          />
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
