import Image from 'next/image'
import styles from './GameScore.module.scss'
import { gameSocket } from '@/socket/gameSocket'
import { useEffect } from 'react'

interface GameScoreProps {
  rivalScore?: number
  rivalNickname?: string
  rivalAvatar?: string
  myScore?: number
}

const baseImg = process.env.NEXT_PUBLIC_API_DEFAULT_PRIFILE_IMAGE

export default function GameScore(props: GameScoreProps) {

  
  return (
    <>
      <div className={styles.scoreHeader}>
        <section className={styles.leftProfile}>
          <Image
            src={baseImg}
            alt={'myImage'}
            width={80}
            height={80}
            className={styles.leftAvatar}
          />
          <div className={styles.leftNickname}>myNickname</div>
        </section>
        <section className={styles.score}>3 : 5</section>
        <section className={styles.rightProfile}>
          <div className={styles.rightNickname}>rivalNickname</div>
          <Image
            src={baseImg}
            alt={'rivalImage'}
            width={80}
            height={80}
            className={styles.rightAvatar}
          />
        </section>
      </div>
    </>
  )
}
