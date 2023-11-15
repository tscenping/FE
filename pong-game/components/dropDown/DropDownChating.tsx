import styles from './DropDownChating.module.scss'
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

export default function DropDownChating({
  id,
  nickname,
  avatar,
  isFriend,
  isBlocked,
  myChannelUserType,
  channelUserType,
  setIsDropDownView,
}: DropDownChatingProps) {
  const adminOnClick = () => {}

  const kickOnClick = () => {}

  const muteOnClick = () => {}

  const benOnClick = () => {}

  const friendOnClick = () => {
    // isFriend 확인해서 post or delete 보내야함.
  }

  const blockOnClick = () => {
    // isBlock 확인해서 post or delete 보내야함.
  }

  const profileOnClick = () => {}

  const gameOnClick = () => {}

  const dmOnClick = () => {}

  return (
    <div className={styles.DropDownChating}>
      {myChannelUserType == 'OWNER' && (
        <>
          {channelUserType == 'ADMIN' ? <button>관리자 해제</button> : <button>관리자 임명</button>}
          {<button>강퇴하기</button>}
          {<button>채팅금지</button>}
          {<button>벤하기</button>}
        </>
      )}
      {myChannelUserType == 'ADMIN' &&
        (channelUserType == 'ADMIN' || 'OWNER' ? null : (
          <>
            {<button>강퇴하기</button>}
            {<button>채팅금지</button>}
            {<button>벤하기</button>}
          </>
        ))}
      {isFriend ? <button>친구삭제</button> : <button>친구추가</button>}
      {isBlocked ? <button>차단해제</button> : <button>차단하기</button>}
      <button>프로필보기</button>
      <button>게임하기</button>
      <button>1:1메세지</button>
    </div>
  )
}
