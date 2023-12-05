import { useModalState } from '@/store/store'
import styles from './DropDownIUserProfile.module.scss'
import EditFriend from '../Function/EditFriend'
import EditBlock from '../Function/EditBlock'
import OpenProfile from '../Function/OpenProfile'

interface DropDownUserProfileProps {
  id?: number
  avatar?: string
  nickname?: string
  isFriend?: boolean
  isBlocked?: boolean
  setIsDropDownView: (v: boolean) => void
}

export default function DropDownUserProfile({
  id,
  avatar,
  nickname,
  isFriend,
  isBlocked,
  setIsDropDownView,
}: DropDownUserProfileProps) {
  const { modalName, setModalName } = useModalState()
  const { setModalProps } = useModalState()

  function setModalPropsValue(nickname: string) {
    setIsDropDownView(false)
    setModalProps({ nickname: nickname })
    setModalName('userProfile')
  }
  return (
    <ul className={styles.DropDownUserProfile}>
      <EditFriend isFriend={isFriend} friendId={id} setIsDropDownView={setIsDropDownView}/>
      <EditBlock isBlocked={isBlocked} friendId={id} setIsDropDownView={setIsDropDownView}/>
      {modalName !== 'userProfile' && <OpenProfile nickname={nickname} setIsDropDownView={setIsDropDownView} />}
      {/* <button
        onClick={() => {
          setModalPropsValue(nickname)
        }}
      >
        프로필보기
      </button> */}
      <button>게임하기</button>
      <button>1:1메세지</button>
    </ul>
  )
}
