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

const baseImg = process.env.NEXT_PUBLIC_API_DEFAULT_PRIFILE_IMAGE

export default function GameScore() {
  const { matchGameState } = useMatchGameState()
  const [playerData, setPlayerData] = useState<PlayerData>()
  const { myNickname, avatar } = useNickNameImage()
  const scoreHandler = (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    gameSocket.once('serverGameReady', (data: GameMatchData) => {
      console.log('serverGameReady')
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
      console.log(data)
      gameSocket.emit('clientGameReady', { gameId: matchGameState.gameId })
      console.log('clientGameReady')
    })
    gameSocket.on('matchScore', scoreHandler)
  }, [])
  return (
    <>
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
        <section className={styles.score}>3 : 5</section>
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
    </>
  )
}
