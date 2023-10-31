import styles from './DropDownIUserProfile.module.scss'

interface DropDownUserProfileProps {
  isFriend?: boolean
  isBlock?: boolean
}

export default function DropDownUserProfile({isFriend, isBlock}: DropDownUserProfileProps) {
  
  return (
    <div className={styles.DropDownUserProfile}>
      {isFriend ? <button>친구삭제</button> : <button>친구추가</button>}
      {isBlock ? <button>차단해제</button> : <button>차단하기</button>}
      <button >프로필보기</button>
      <button>게임하기</button>
      <button>1:1메세지</button>
      
    </div>
  )
}