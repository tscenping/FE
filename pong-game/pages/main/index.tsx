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
  const { lodingState, setLodingState } = useLodingState()
  const { setMatchGameState } = useMatchGameState()
  const { setApiError } = useErrorCheck()

  const onClickLadderBtn = async () => {
    try {
      setLodingState({
        isLoding: true,
        lodingTitle: 'searchGame',
        gameType: 'LADDER',
      })
      await instance.post('/game/match', { gameType: 'LADDER' }).then((res) => {
        console.log(res)
      })

      // router.push('/match')
    } catch (e) {
      if (e && e.response.status === 401) setApiError(401)
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
    <>
      {!lodingState.isLoding && (
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
      )}
    </>
  )
}
