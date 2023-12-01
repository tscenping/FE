import Image from 'next/image'
import styles from './UserProfileInfo.module.scss'
import friendEdit from '@/public/img/modal/friendEdit.svg'
import { useModalState } from '@/store/store'
import { useEffect, useState } from 'react'
import DropDown from '@/components/DropDown/DropDown'
import { useNickNameImage } from '@/store/login'

interface UserProfileProps {
  id: number
  nickname: string
  avatar: string
  statusMessage: string
  loseCount: number
  winCount: number
  totalCount: number
  ladderRank: number
  ladderScore: number
  ladderMaxScore: number
  isFriend: boolean
  isBlocked: boolean
}

interface UserProfileInfo {
  userProfileProps: UserProfileProps
}

export default function UserProfileInfo(userProfileInfo: UserProfileInfo) {
  const {
    id,
    nickname,
    avatar,
    statusMessage,
    loseCount,
    winCount,
    totalCount,
    ladderRank,
    ladderScore,
    ladderMaxScore,
    isFriend,
    isBlocked,
  } = userProfileInfo.userProfileProps
  const [dropDownState, setDropDownState] = useState(false)
  const {myNickname} = useNickNameImage()

  function LineThreeContent(props: { title: string; content: string }) {
    return (
      <div className={styles.lineThreeContent}>
        <span className={styles.recordText}>{props.title}</span>
        <br />
        <span className={styles.recordText}>{props.content}</span>
      </div>
    )
  }

  function RenderLadderScore() {
    return (
      <>
        <LineThreeContent title="랭킹" content={`${ladderRank}`} />
        <LineThreeContent title="래더점수" content={`${ladderScore}`} />
        <LineThreeContent title="최고점수" content={`${ladderMaxScore}`} />
        <LineThreeContent title="통계" content={`${totalCount}전 ${winCount}승 ${loseCount}패`} />
      </>
    )
  }
  return (
    <>
      <section className={styles.lineOne}>
        <div className={styles.profileNickName}>
          <div className={styles.profileImg}>
            <Image src={avatar} alt={'profileImage'} width={80} height={80} />
          </div>
          <div className={styles.nickName}>{nickname}</div>
          { myNickname !== nickname &&  <Image
            src={friendEdit}
            alt={'friendEdit'}
            width={30}
            height={30}
            onClick={() => setDropDownState((prev) => !prev)}
            className={styles.friendEditBtn}
          />}
          <div>
            {dropDownState && (
              <DropDown
                isDropDownView={dropDownState}
                setIsDropDownView={setDropDownState}
                dropDownState="userProfile"
                userProfile={{
                  id: 1,
                  nickname: nickname,
                  avatar: 'avatar-url',
                  isFriend: true,
                  isBlocked: false,
                }}
              />
            )}
          </div>
        </div>
      </section>
      <section className={styles.lineTwo}>{statusMessage}</section>
      <section className={styles.lineThree}>
        <RenderLadderScore />
      </section>
    </>
  )
}
