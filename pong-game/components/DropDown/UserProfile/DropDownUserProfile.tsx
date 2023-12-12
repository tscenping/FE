import { useModalState } from '@/store/store'
import styles from './DropDownIUserProfile.module.scss'
import EditFriend from '../Function/EditFriend'
import EditBlock from '../Function/EditBlock'
import OpenProfile from '../Function/OpenProfile'
import InviteGame from '../Function/InviteGame'

interface DropDownUserProfileProps {
  id?: number
  avatar?: string
  nickname?: string
  isFriend?: boolean
  isBlocked?: boolean
  calledFrom?: 'searchUserList'
  setIsDropDownView: (v: boolean) => void
}

export default function DropDownUserProfile({
  id,
  avatar,
  nickname,
  isFriend,
  isBlocked,
  calledFrom,
  setIsDropDownView,
}: DropDownUserProfileProps) {
  const { modalName, setModalName } = useModalState()

  return (
    <ul className={styles.DropDownUserProfile}>
      <EditFriend
        isFriend={isFriend}
        friendId={id}
        setIsDropDownView={setIsDropDownView}
        nickname={nickname}
        calledFrom={calledFrom}
      />
      <EditBlock
        isBlocked={isBlocked}
        friendId={id}
        setIsDropDownView={setIsDropDownView}
        nickname={nickname}
        calledFrom={calledFrom}
      />
      {modalName !== 'userProfile' && (
        <OpenProfile nickname={nickname} setIsDropDownView={setIsDropDownView} />
      )}
      <InviteGame
      friendId={id}
      avatar={avatar}
      setIsDropDownView={setIsDropDownView}
      nickname={nickname}/>
      <button>1:1메세지</button>
    </ul>
  )
}
