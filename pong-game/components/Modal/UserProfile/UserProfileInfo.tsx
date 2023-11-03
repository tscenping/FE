import Image from 'next/image'
import styles from './UserProfileInfo.module.scss'
import profileImage from '@/public/img/mypage/profileImage.svg'
import friendEdit from '@/public/img/modal/friendEdit.svg'
import { useModalState } from '@/store/store'
import { useEffect, useState } from 'react'
import DropDown from '@/components/DropDown/DropDown'

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
      <LineThreeContent title="랭킹" content={`${ladderRank}`}/>
      <LineThreeContent title="랭킹" content={`${ladderScore}`}/>
      <LineThreeContent title="랭킹" content={`${ladderMaxScore}`}/>
      <LineThreeContent title="랭킹" content={`${totalCount}전 ${winCount}승 ${loseCount}패`}/>
      </>
    )
  }

  

  return (
    <>
      <section className={styles.lineOne}>
        <div className={styles.profileNickName}>
          <div className={styles.profileImg}>
            <Image src={profileImage} alt={'profileImage'} width={80} />
          </div>
          <div className={styles.nickName}>{nickname}</div>
          <Image
            src={friendEdit}
            alt={'friendEdit'}
            width={30}
            onClick={() => setDropDownState((prev) => !prev)}
          />
          <div>
            {dropDownState && (
              <DropDown
                isDropDownView={dropDownState}
                setIsDropDownView={setDropDownState}
                dropDownState="userProfile"
                userProfile={{
                  isFriend: true,
                  isBlock: false,
                }}
              />
            )}
          </div>
        </div>
      </section>
      <section className={styles.lineTwo}>{statusMessage}</section>
      <section className={styles.lineThree}>
        <RenderLadderScore/>
      </section>
    </>
  )
}
