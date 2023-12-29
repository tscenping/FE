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
  myLadderScore: number | null // 나의 래더 점수
  rivalLadderScore: number | null // 상대방 래더 점수
  gameType:
    | 'LADDER'
    | 'NONE'
    | 'NORMAL_MATCHING'
    | 'SPECIAL_MATCHING'
    | 'SPECIAL_INVITE'
    | 'NORMAL_INVITE'
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
    gameSocket.once('matchEnd', (endData: MatchResultProps) => {
      console.log('matchEnd', endData)
      setModalName('matchResult')
      setMatchResultState({
        rivalAvatar: endData.rivalAvatar,
        rivalName: endData.rivalName,
        rivalScore: endData.rivalScore,
        myScore: endData.myScore,
        isWin: endData.isWin,
        myLadderScore: endData.myLadderScore,
        rivalLadderScore: endData.rivalLadderScore,
        gameType: endData.gameType,
      })
    })
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

      gameSocket.emit('clientGameReady', { gameId: matchGameState.gameId })

      setMatchResultState({
        ...matchResultState, // 기존 상태를 가져옴
        rivalName: data.rivalNickname,
        rivalAvatar: data.rivalAvatar,
      })
    })
    const scoreHandler = (data: { myScore; rivalScore }) => {
      console.log(myPosition)
      console.log('matchScore', data)
      if (myPosition === 'LEFT') {
        setScore({ leftScore: data.myScore, rightScore: data.rivalScore })
      } else {
        setScore({ leftScore: data.rivalScore, rightScore: data.myScore })
      }
    }
    gameSocket.on('matchScore', scoreHandler)
    return () => {
      gameSocket.off('serverGameReady')
      gameSocket.off('matchScore')
      gameSocket.off('matchEnd')
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
    </>
  )
}
