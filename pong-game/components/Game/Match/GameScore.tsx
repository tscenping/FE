import Image from 'next/image'
import styles from './GameScore.module.scss'
import { gameSocket } from '@/socket/gameSocket'
import { useEffect, useState } from 'react'
import { useNickNameImage } from '@/store/login'
import { useMatchGameState } from '@/store/game'

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

const baseImg = process.env.NEXT_PUBLIC_API_DEFAULT_PRIFILE_IMAGE

export default function GameScore() {
  const { matchGameState } = useMatchGameState()
  const [playerData, setPlayerData] = useState<PlayerData>()
  const { myNickname, avatar } = useNickNameImage()
  const [myPosition, setMyPosition] = useState<string>('LEFT')
  const [score, setScore] = useState<ScoreData>({ leftScore: 0, rightScore: 0 })
  const scoreHandler = (data: { myScore; rivalScore }) => {
    if (myPosition === 'LEFT') {
      setScore({ leftScore: data.myScore, rightScore: data.rivalScore })
    } else {
      setScore({ leftScore: data.rivalScore, rightScore: data.myScore })
    }
  }

  useEffect(() => {
    gameSocket.once('serverGameReady', (data: GameMatchData) => {
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
    })
    gameSocket.on('matchScore', scoreHandler)
    return () => {
      gameSocket.off('matchScore')
    }
  }, [])
  return (
    <>
    {playerData && 
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
      }
    </>
  )
}
