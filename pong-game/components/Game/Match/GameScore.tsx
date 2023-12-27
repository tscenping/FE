import Image from 'next/image'
import styles from './GameScore.module.scss'
import { gameSocket } from '@/socket/gameSocket'
import { useEffect, useState } from 'react'
import { useNickNameImage } from '@/store/login'
import { useMatchGameState, useMatchResultState } from '@/store/game'
import { useModalState } from '@/store/store'

interface GameMatchData {
  rivalNickname: string
  rivalAvatar: string
  myPosition?: string
}

interface PlayerData {
  leftPlayer: {
    nickname: string
    avatar: string
  }
  rightPlayer: {
    nickname: string
    avatar: string
  }
}

interface ScoreData {
  leftScore: number
  rightScore: number
}
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

const baseImg = process.env.NEXT_PUBLIC_API_DEFAULT_PRIFILE_IMAGE

export default function GameScore() {
  const { matchGameState } = useMatchGameState()
  const { matchResultState, setMatchResultState } = useMatchResultState()
  const [playerData, setPlayerData] = useState<PlayerData>()
  const { myNickname, avatar } = useNickNameImage()
  const [myPosition, setMyPosition] = useState<string>()
  const { setModalName } = useModalState()
  const [score, setScore] = useState<ScoreData>({ leftScore: 0, rightScore: 0 })

  useEffect(() => {
    gameSocket.once('serverGameReady', (data: GameMatchData) => {
      // console.log('scors : serverGameReady')
      // console.log(data.myPosition)
      setMyPosition(data.myPosition)
      if (data.myPosition === 'LEFT') {
        setPlayerData({
          leftPlayer: {
            nickname: myNickname,
            avatar: avatar,
          },
          rightPlayer: {
            nickname: data.rivalNickname,
            avatar: data.rivalAvatar,
          },
        })
      } else {
        setPlayerData({
          leftPlayer: {
            nickname: data.rivalNickname,
            avatar: data.rivalAvatar,
          },
          rightPlayer: {
            nickname: myNickname,
            avatar: avatar,
          },
        })
      }
      gameSocket.once('matchEnd', (endData: MatchResultProps) => {
        console.log('matchEnd')
        setModalName('matchResult')
        setMatchResultState({
          rivalAvatar: data.rivalAvatar,
          rivalName: data.rivalNickname,
          rivalScore: endData.rivalScore,
          myScore: endData.myScore,
          isWin: endData.isWin,
          myRadderScore: endData.myRadderScore,
          rivalRadderScore: endData.rivalRadderScore,
          gameType: endData.gameType,
        })
      })
      gameSocket.emit('clientGameReady', { gameId: matchGameState.gameId })

      setMatchResultState({
        ...matchResultState, // 기존 상태를 가져옴
        rivalName: data.rivalNickname,
        rivalAvatar: data.rivalAvatar,
      })
    })
    const scoreHandler = (data: { myScore; rivalScore }) => {
      console.log(myPosition)
      console.log(data)
      if (myPosition === 'LEFT') {
        setScore({ leftScore: data.myScore, rightScore: data.rivalScore })
      } else {
        setScore({ leftScore: data.rivalScore, rightScore: data.myScore })
      }
    }
    gameSocket.on('matchScore', scoreHandler)
    return () => {
      gameSocket.off('matchScore')
      gameSocket.off('serverGameReady')
    }
  }, [myPosition])
  return (
    <>
      {playerData && (
        <div className={styles.scoreHeader}>
          <section className={styles.leftProfile}>
            <Image
              src={playerData?.leftPlayer.avatar}
              alt={'myImage'}
              width={80}
              height={80}
              className={styles.leftAvatar}
            />
            <div className={styles.leftNickname}>{playerData?.leftPlayer.nickname}</div>
          </section>
          <section className={styles.score}>
            {score.leftScore} : {score.rightScore}
          </section>
          <section className={styles.rightProfile}>
            <div className={styles.rightNickname}>{playerData?.rightPlayer.nickname}</div>
            <Image
              src={playerData?.rightPlayer.avatar}
              alt={'rivalImage'}
              width={80}
              height={80}
              className={styles.rightAvatar}
            />
          </section>
        </div>
      )}
      <button
        onClick={() => {
          setModalName('matchResult')
          setMatchResultState({
            rivalAvatar: playerData.leftPlayer.avatar,
            rivalName: playerData.leftPlayer.nickname,
            rivalScore: 3,
            myScore: 6,
            isWin: true,
            myRadderScore: 1200,
            rivalRadderScore: 1200,
            gameType: 'NORMAL'
          })
        }}
      >
        게임 종료
      </button>
    </>
  )
}
