import styles from './index.module.scss'
import { useState, useEffect } from 'react'

import PageTitle from '@/components/UI/PageTitle'
import NormalGame from '@/components/Game/NormalGame'
import { useRouter, NextRouter } from 'next/router'
import { socket } from '@/socket/socket'
import { instance } from '@/util/axios'
import { useLodingState } from '@/store/loding'
import { useMatchGameState } from '@/store/game'
import { useErrorCheck } from '@/store/login'

interface gameMatchedData {
  gameId: number
}

export default function Home() {
  const [gameState, setGameState] = useState<string>('')
  const [pageState, setPageState] = useState(1)
  const router: NextRouter = useRouter()
  const { setLodingState } = useLodingState()
  const { setMatchGameState } = useMatchGameState()
  const { setApiError } = useErrorCheck()

  const onClickLadderBtn = async () => {
    try {
      await instance.post('/game/match', { gameType: 'LADDER' }).then((res) => {
        console.log(res)
      })
      setLodingState({
        isLoding: true,
        lodingTitle: 'searchGame',
        gameType: 'LADDER',
      })
      // router.push('/match')
    } catch (e) {
      if (e.response.status === 401) setApiError(401)
      console.log(e.message)
    }
  }
  const onClickNomalBtn = () => {
    setGameState('nomal')
    setPageState(2)
  }

  const gameMatchHandler = (data: gameMatchedData) => {
    setMatchGameState({ gameId: data.gameId })
    setLodingState({ isLoding: false })
    router.push('/match')
  }

  useEffect(() => {
    socket.on('gameMatched', gameMatchHandler)
    return () => {
      socket.off('gameMatched')
    }
  }, [gameMatchHandler])

  return (
    <div className={styles.backGround}>
      {gameState ? (
        gameState === 'nomal' && (
          <NormalGame setPageState={setPageState} setGameState={setGameState} />
        )
      ) : (
        <div>
          <section>
            <div className={styles.title}>
              <PageTitle
                title="Game Start"
                subTitle="일반게임과 래더게임 중 하나를 선택해주세요."
              />
            </div>
          </section>
          <section className={styles.btn}>
            <button className={styles.gameBtn} onClick={onClickLadderBtn}>
              Ladder
            </button>
            <button className={styles.gameBtn} onClick={onClickNomalBtn}>
              Normal
            </button>
          </section>
        </div>
      )}
      <section className={styles.pageNation}>
        {pageState === 1 ? (
          <div className={styles.nowPage}></div>
        ) : (
          <div className={styles.prvPage}></div>
        )}
        {pageState === 2 ? (
          <div className={styles.nowPage}></div>
        ) : (
          <div className={styles.prvPage}></div>
        )}
      </section>
    </div>
  )
}
