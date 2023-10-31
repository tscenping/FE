import Image from 'next/image'
import profileImage from '@/public/img/mypage/profileImage.svg'
import styles from './MatchHistory.module.scss'

interface MatchHistoryProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number
  myScore: number
  isWinner: boolean
}

export default function MatchHistory({
  rivalName,
  rivalAvatar,
  rivalScore,
  myScore,
  isWinner,
}: MatchHistoryProps) {
  return (
    <div className={styles.historyList}>
      <section className={styles.historyContent}>
        <div className={styles.result}>{isWinner && 'Win'}</div>
        <div className={styles.leftUser}>
          <Image
            src={profileImage}
            alt={'profileImage'}
            // className={styles.radioImg}
            width={64}
            // height={40}
          />
          abcdefghhhh
        </div>
        <div className={styles.score}>
          {myScore} : {rivalScore}
        </div>
        <div className={styles.rightUser}>
          {rivalName}
          <Image
            src={profileImage}
            alt={'profileImage'}
            // className={styles.radioImg}
            width={64}
            // height={40}
          />
        </div>
        <div className={styles.result}>{!isWinner && 'Win'}</div>
      </section>
    </div>
  )
}
