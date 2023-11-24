import ChatDropDownOwner from './ChatDropDownOwner'
import styles from './DropDownChating.module.scss'
import ChatDropDownAdmin from './ChatDropDownAdmin'
import ChatDropDownCommon from './ChatDropDownCommon'
interface DropDownChatingProps {
  id: number
  nickname: string
  avatar: string
  isFriend: boolean
  isBlocked: boolean
  myChannelUserType: 'OWNER' | 'ADMIN' | 'COMMON'
  channelUserType: 'OWNER' | 'ADMIN' | 'COMMON'
  setIsDropDownView: (v: boolean) => void
}

type DropDownKey = 'OWNER' | 'ADMIN' | 'COMMON'

export default function DropDownChating(props: DropDownChatingProps) {
  const dropDownContent: { [key in DropDownKey]: JSX.Element | null } = {
    OWNER: <ChatDropDownOwner channelUserType={props.channelUserType} />,
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
{/* 
      <EditFriend isFriend={props.isFriend} />
      <EditBlock isBlocked={props.isBlocked} />
      <button>프로필보기</button>
      <InviteGame />
      <DirectMsg />
       */}
    </ul>
  )
}
