import Image from 'next/image'
import styles from './MatchHistory.module.scss'
import { useNickNameImage } from '@/store/login'

interface MatchHistoryProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number
  userAvatar?: string
  myScore: number
  isWinner: boolean
  targetNickname?: string
}

export default function MatchHistory({
  rivalName,
  rivalAvatar,
  rivalScore,
  myScore,
  isWinner,
  userAvatar,
  targetNickname,
}: MatchHistoryProps) {
  const { myNickname, avatar } = useNickNameImage()

  // console.log(rivalAvatar, avatar)
  return (
    <div className={styles.historyList}>
      <section className={styles.historyContent}>
        <div className={styles.result}>{isWinner && 'Win'}</div>
        <div className={styles.leftUser}>
          <Image
            src={userAvatar ? userAvatar : avatar}
            alt={'profileImage'}
            // className={styles.radioImg}
            width={64}
            height={64}
          />
          {targetNickname ? targetNickname : myNickname}
        </div>
        <div className={styles.score}>
          {myScore} : {rivalScore}
        </div>
        <div className={styles.rightUser}>
          {rivalName}
          <Image
            src={rivalAvatar}
            alt={'profileImage'}
            // className={styles.radioImg}
            width={64}
            height={64}
          />
        </div>
        <div className={styles.result}>{!isWinner && 'Win'}</div>
      </section>
    </div>
  )
}
