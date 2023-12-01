import ChatDropDownOwner from './ChatDropDownOwner'
import styles from './DropDownChating.module.scss'
import ChatDropDownAdmin from './ChatDropDownAdmin'
import ChatDropDownCommon from './ChatDropDownCommon'
import DirectMsg from '../Function/DirectMsg'
import InviteGame from '../Function/InviteGame'
import EditBlock from '../Function/EditBlock'
import EditFriend from '../Function/EditFriend'
interface DropDownChatingProps {
  id: number
  nickname: string
  avatar: string
  isFriend: boolean
  isBlocked: boolean
  channelUserId: number
  myChannelUserType: 'OWNER' | 'ADMIN' | 'COMMON'
  channelUserType: 'OWNER' | 'ADMIN' | 'COMMON'
  setIsDropDownView: (v: boolean) => void
}

type DropDownKey = 'OWNER' | 'ADMIN' | 'COMMON'

export default function DropDownChating(props: DropDownChatingProps) {
  const dropDownContent: { [key in DropDownKey]: JSX.Element | null } = {
    OWNER: <ChatDropDownOwner channelUserType={props.channelUserType} nickname={props.nickname} channelUserId={props.channelUserId}/>,
    ADMIN: (
      <ChatDropDownAdmin
        channelUserType={props.channelUserType}
        setIsDropDownView={props.setIsDropDownView}
        nickname={props.nickname}
        isBlocked={props.isBlocked}
        isFriend={props.isFriend}
      />
    ),
    COMMON: <ChatDropDownCommon />,
  }

  return (
    <ul className={styles.DropDownChating}>
      {dropDownContent[props.myChannelUserType]}
      
      <EditFriend isFriend={props.isFriend} friendId={props.id}/>
      <EditBlock isBlocked={props.isBlocked} friendId={props.id}/>
      <button>프로필보기</button>
      <InviteGame />
      <DirectMsg />
      
    </ul>
  )
}
