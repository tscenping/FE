import ModalPageTitle from '@/components/UI/ModalPageTitle'
import winImg from '@/public/img/modal/gameResultWin.svg'
import defaultImg from '@/public/img/mypage/profileImage.svg'
import { useMatchResultState } from '@/store/game'
import Image from 'next/image'
import styles from './GameResult.module.scss'
import { useNickNameImage } from '@/store/login'
import { useRouter } from 'next/router'
import { useModalState } from '@/store/store'
import { useEffect } from 'react'

interface MatchResultProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number // 상대 매치 점수
  myScore: number // 나의 매치 점수
  isWin: boolean // 승리 여부
  myLadderScore: number | null // 나의 래더 점수
  rivalLadderScore: number | null // 상대방 래더 점수
  gameType:
    | 'LADDER'
    | 'NONE'
    | 'NORMAL_MATCH'
    | 'SPECIAL_MATCH'
    | 'SPECIAL_INVITE'
    | 'NORMAL_INVITE' // 진행했던 게임 타입
}

export default function GameResult() {
  const { matchResultState } = useMatchResultState()
  const { myNickname, avatar } = useNickNameImage()
  const { setModalName } = useModalState()
  const router = useRouter()
  const title: { [key: string]: string } = {
    NORMAL_MATCHING: 'NORMAL GAME',
    SPECIAL_MATCHING: 'SPECIAL GAME',
    SPECIAL_INVITE: 'SPECIAL GAME',
    NORMAL_INVITE: 'NORMAL GAME',
    LADDER: 'LADDER GAME',
    NONE: 'INVALIDTY',
  }

  const closeHandler = () => {
    setModalName(null)
    router.push('/main')
  }

  useEffect(() => {
    if (matchResultState.gameType === 'NONE') {
      alert('경기가 비정상 종료되었습니다.')
      setModalName(null)
      router.push('/main')
    }
  }, [matchResultState])

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
              {matchResultState.isWin && (
                <Image src={winImg} alt={'winImg'} width={32} height={32} />
              )}
              <Image src={avatar} alt={'leftImg'} width={120} height={120} />
            </span>
            <div className={styles.score}>
              {matchResultState.myScore} : {matchResultState.rivalScore}
            </div>
            <span className={styles.image}>
              {!matchResultState.isWin && (
                <Image src={winImg} alt={'winImg'} width={24} height={24} />
              )}
              <Image src={matchResultState.rivalAvatar} alt={'leftImg'} width={120} height={120} />
            </span>
          </li>
          <li className={styles.lineTwo}>
            <div className={styles.nicknameLadder}>
              <span>{myNickname}</span>
              {matchResultState.gameType === 'LADDER' && (
                <span>{matchResultState.myLadderScore} 점</span>
              )}
            </div>
            <div className={styles.result}>{matchResultState.isWin ? 'WIN' : 'LOSE'}</div>
            <div className={styles.nicknameLadder}>
              <span>{matchResultState.rivalName}</span>
              {matchResultState.gameType === 'LADDER' && (
                <span>{matchResultState.rivalLadderScore} 점</span>
              )}
            </div>
          </li>
        </ul>
        <button onClick={closeHandler}>Go Home</button>
      </div>
    </>
  )
}
