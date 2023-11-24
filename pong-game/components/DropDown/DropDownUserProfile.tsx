import { useModalState } from '@/store/store'
import styles from './DropDownIUserProfile.module.scss'

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
  const { setModalName } = useModalState()
  const { setModalProps } = useModalState()

  function setModalPropsValue(nickname: string) {
    setIsDropDownView(false)
    setModalProps({ nickname: nickname })
    setModalName('userProfile')
  }
  return (
    <div className={styles.DropDownUserProfile}>
      {isFriend ? <button>친구삭제</button> : <button>친구추가</button>}
      {isBlocked ? <button>차단해제</button> : <button>차단하기</button>}
      <button
        onClick={() => {
          setModalPropsValue(nickname)
        }}
      >
        프로필보기
      </button>
      <button>게임하기</button>
      <button>1:1메세지</button>
    </div>
  )
}
