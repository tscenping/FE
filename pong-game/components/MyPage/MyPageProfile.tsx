import Image from 'next/image'
import textEditBtn from '@/public/img/mypage/textEdit.svg'
import styles from './MyPageProfile.module.scss'
import profileImage from '@/public/img/mypage/profileImage.svg'
import React, { useState, ChangeEvent, useRef, useEffect } from 'react'

interface MatchHistoryProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number
  myScore: number
  isWinner: boolean
}

interface PageInfo {
  requestPage: number
  requestDataSize: number
  totalPage: number
  totalDataSize: number
}

interface MyPageProfileProps {
  nickName: string
  avatar: string
  statusMessage: string
  loseCount: number
  winCount: number
  totalCount: number
  ladderRank: number
  ladderScore: number
  ladderMaxScore: number
  gameInfo?: {
    gameHistories: MatchHistoryProps[]
    pageInfo: PageInfo
  }
}

export default function MyPageProfile({
  nickName,
  // avatar,
  statusMessage,
  loseCount,
  winCount,
  totalCount,
  ladderRank,
  ladderScore,
  ladderMaxScore,
}: MyPageProfileProps) {
  const [editProfileMsgFlag, setEditProfileMsgFlag] = useState(false)
  const [profileMsg, setProfileMsg] = useState(statusMessage)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const handleEditProfileMsg = () => {
    setEditProfileMsgFlag(!editProfileMsgFlag)
  }

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value

    if (inputText.length <= 20) {
      // 입력한 텍스트가 80자 이하인 경우에만 업데이트
      setProfileMsg(inputText)
    }
  }
  useEffect(() => {
    if (editProfileMsgFlag && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length,
      )
    }
  }, [editProfileMsgFlag])

  return (
    <div className={styles.backGround}>
      <section className={styles.userProfile}>
        <div className={styles.lineOneTwo}>
          <section className={styles.lineOne}>
            <div className={styles.profileNickName}>
              <div className={styles.profileImg}>
                <Image src={profileImage} alt={'profileImage'} width={80} />
              </div>
              <div className={styles.nickName}>{nickName}</div>
            </div>
            <div className={styles.secondAuth}>2차 인증</div>
          </section>
          <section className={styles.lineTwo}>
            <div className={styles.profileMessage}>
              <div className={styles.text}>
                {editProfileMsgFlag ? (
                  <textarea
                    rows={4}
                    cols={50}
                    id="profileMsg"
                    value={profileMsg}
                    onChange={handleTextChange}
                    className={styles.textarea}
                    ref={textareaRef}
                  />
                ) : (
                  <div>{profileMsg}</div>
                )}
              </div>
              <Image
                src={textEditBtn}
                alt={'textEditBtn'}
                width={30}
                className={styles.textEditBtn}
                onClick={handleEditProfileMsg}
              />
            </div>
            <div className={styles.record}>
              {totalCount}전&nbsp;&nbsp;&nbsp;{winCount}승&nbsp;&nbsp;&nbsp;
              {loseCount}패
            </div>
          </section>
        </div>
        <section className={styles.lineThree}>
          <div>
            <span className={styles.rankTitle}>랭킹</span>
            <span className={styles.rankSubTitle}>{ladderRank}</span>
          </div>
          <div>
            <span className={styles.rankTitle}>래더점수</span>
            <span className={styles.rankSubTitle}>{ladderScore}</span>
          </div>
          <div>
            <span className={styles.rankTitle}>최고점수</span>
            <span className={styles.rankSubTitle}>{ladderMaxScore}</span>
          </div>
        </section>
      </section>
    </div>
  )
}
