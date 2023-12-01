import ChatDropDownOwner from './ChatDropDownOwner'
import styles from './DropDownChating.module.scss'
import ChatDropDownAdmin from './ChatDropDownAdmin'
import ChatDropDownCommon from './ChatDropDownCommon'
import DirectMsg from '../Function/DirectMsg'
import InviteGame from '../Function/InviteGame'
import EditBlock from '../Function/EditBlock'
import EditFriend from '../Function/EditFriend'
import OpenProfile from '../Function/OpenProfile'
interface DropDownChatingProps {
  id: number
  nickname: string
  avatar: string
  isFriend: boolean
  isBlocked: boolean
  channelUserId: number
  myChannelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  setIsDropDownView: (v: boolean) => void
}

type DropDownKey = 'OWNER' | 'ADMIN' | 'MEMBER'

export default function DropDownChating(props: DropDownChatingProps) {
  const dropDownContent: { [key in DropDownKey]: JSX.Element | null } = {
    OWNER: (
      <ChatDropDownOwner
        channelUserType={props.channelUserType}
        nickname={props.nickname}
        channelUserId={props.channelUserId}
        setIsDropDownView={props.setIsDropDownView}
      />
    ),
    ADMIN: (
      <ChatDropDownAdmin
        channelUserType={props.channelUserType}
        nickname={props.nickname}
        channelUserId={props.channelUserId}
        setIsDropDownView={props.setIsDropDownView}
      />
    ),
    MEMBER: <ChatDropDownCommon />,
  }
  console.log(props.myChannelUserType)

  return (
    <ul className={styles.DropDownChating}>
      {dropDownContent[props.myChannelUserType]}

      <EditFriend
        isFriend={props.isFriend}
        friendId={props.id}
        setIsDropDownView={props.setIsDropDownView}
      />
      <EditBlock
        isBlocked={props.isBlocked}
        friendId={props.id}
        setIsDropDownView={props.setIsDropDownView}
      />
      <OpenProfile nickname={props.nickname} setIsDropDownView={props.setIsDropDownView} />
      <InviteGame />
      <DirectMsg />
    </ul>
  )
}
