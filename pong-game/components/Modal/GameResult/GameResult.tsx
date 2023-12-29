import ModalPageTitle from '@/components/UI/ModalPageTitle'
import winImg from '@/public/img/modal/gameResultWin.svg'
import defaultImg from '@/public/img/mypage/profileImage.svg'
import { useMatchResultState } from '@/store/game'
import Image from 'next/image'
import styles from './GameResult.module.scss'
import { useNickNameImage } from '@/store/login'
import { useRouter } from 'next/router'
import { useModalState } from '@/store/store'

interface MatchResultProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number // 상대 매치 점수
  myScore: number // 나의 매치 점수
  isWin: boolean // 승리 여부
  myRadderScore: number | null // 나의 래더 점수
  rivalRadderScore: number | null // 상대방 래더 점수
  gameType: 'NORMAL' | 'SPECIAL' | 'RADDER' | 'NONE' // 진행했던 게임 타입
}

export default function GameResult() {
  const { matchResultState } = useMatchResultState()
  const { myNickname, avatar } = useNickNameImage()
  const { setModalName } = useModalState()
  const router = useRouter()
  const title: { [key: string]: string } = {
    NORMAL: 'NORMAL GAME',
    SPECIAL: 'SPECIAL GAME',
    RADDER: 'RADDER GAME',
    NONE: 'INVALIDTY',
  }

  const closeHandler = () => {
    setModalName(null)
    router.replace('/main')
  }

  return (
    <>
      {/* <div className={styles.backGround}>
        <div className={styles.title}>{matchResultState.isWin ? 'WIN' : 'LOSE'}</div>
        <section className={styles.resultContent}>
          <div className={styles.nicknameImg}>
            <span className={styles.profileImg}>
              <Image src={winImg} alt={'winImg'} width={24} height={24} />
              <Image src={avatar} alt={'leftImg'} width={120} height={120} />
            </span>
            <span className={styles.nickname}>{myNickname}</span>
          </div>
          <div className={styles.score}>{matchResultState.myScore} : {matchResultState.rivalScore}</div>
          <div className={styles.nicknameImg}>
            <span className={styles.profileImg}>
              <Image src={winImg} alt={'winImg'} width={24} height={24} />
              <Image src={matchResultState.rivalAvatar} alt={'rightImg'} width={120} height={120} />
            </span>
            <span className={styles.nickname}>{matchResultState.rivalName}</span>
            <span className={styles.radder}>1200점</span>
          </div>
        </section>
        <button onClick={closeHandler}>Go Home</button>
      </div> */}
      <div className={styles.backGround}>
        <h1 className={styles.title}>{title[matchResultState.gameType]}</h1>

        <ul className={styles.content}>
          <li className={styles.lineOne}>
            <span className={styles.image}>
              <Image src={winImg} alt={'winImg'} width={32} height={32} />
              <Image src={defaultImg} alt={'leftImg'} width={120} height={120} />
            </span>
            <div className={styles.score}>
              {matchResultState.myScore} : {matchResultState.rivalScore}
            </div>
            <span className={styles.image}>
              {/* <Image src={winImg} alt={'winImg'} width={24} height={24} /> */}
              <Image src={defaultImg} alt={'leftImg'} width={120} height={120} />
            </span>
          </li>
          <li className={styles.lineTwo}>
            <div className={styles.nicknameRadder}>
              <span>{myNickname}</span>
              <span>{matchResultState.myRadderScore} 점</span>
            </div>
            <div className={styles.result}>{matchResultState.isWin ? 'WIN' : 'LOSE'}</div>
            <div className={styles.nicknameRadder}>
              <span>{matchResultState.rivalName}</span>
              {/* <span>{matchResultState.rivalRadderScore} 점</span> */}
            </div>
          </li>
        </ul>
        <button onClick={closeHandler}>Go Home</button>
      </div>
    </>
  )
}
