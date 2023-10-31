import Image from 'next/image'
import textEditBtn from '@/public/img/mypage/textEdit.svg'
import styles from './MyPageProfile.module.scss'
import profileImage from '@/public/img/mypage/profileImage.svg'
interface MatchHistoryProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number
  myScore: number
  isWinner: boolean
}
interface PageInfo {
  requestPage: number
  requestDataSzie: number
  totalPage: number
  totalDateSize: number
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
  avatar,
  statusMessage,
  loseCount,
  winCount,
  totalCount,
  ladderRank,
  ladderScore,
  ladderMaxScore,
}: MyPageProfileProps) {
  return (
    <div>
      <section className={styles.userProfile}>
        <section className={styles.lineOne}>
          <div className={styles.profileNickName}>
            <div className={styles.profileImg}>
              <Image
                src={profileImage}
                alt={'profileImage'}
                // className={styles.radioImg}
                width={80}
                // height={40}
              />
            </div>
            <div className={styles.nickName}>{nickName}</div>
          </div>
          <div className={styles.profileMessage}>
            <div className={styles.text}>{statusMessage}</div>
            <Image
              src={textEditBtn}
              alt={'textEditBtn'}
              className={styles.textEditBtn}
              width={30}
              // height={40}
            />
          </div>
        </section>
        <section className={styles.lineTwo}>
          <div className={styles.secondAuth}>2차 인증</div>
          <div className={styles.record}>
            {totalCount}전&nbsp;&nbsp;&nbsp;{winCount}승&nbsp;&nbsp;&nbsp;
            {loseCount}패
          </div>
        </section>
        <section className={styles.lineThree}>
          <div>
            <span className={styles.rankTitle}>랭킹</span>
            <br />
            <span className={styles.rankSubTitle}>{ladderRank}</span>
          </div>
          <div>
            <span className={styles.rankTitle}>래더점수</span>
            <br />
            <span className={styles.rankSubTitle}>{ladderScore}</span>
          </div>
          <div>
            <span className={styles.rankTitle}>최고점수</span>
            <br />
            <span className={styles.rankSubTitle}>{ladderMaxScore}</span>
          </div>
        </section>
      </section>
    </div>
  )
}
