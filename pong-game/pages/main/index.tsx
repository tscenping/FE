import styles from './index.module.scss'
import Layout from '@/components/Layout/Layout'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import NormalGame from '@/components/Game/normalGame'
import PageTitle from '@/components/UI/PageTitle'
import RankGame from '@/components/Game/rankGame'

export default function Home() {
  const [gameState, setGameState] = useState<string>('')
  const [pageState, setPageState] = useState(1)
  const onClickLadderBtn = () => {
    // setGameState('rank')
  }
  const onClickNomalBtn = () => {
    setGameState('nomal')
    setPageState(2)
  }

  return (
    <div className={styles.backGround}>
      {gameState ? (
        gameState === 'nomal' ? (
          <NormalGame setPageState={setPageState} setGameState={setGameState} />
        ) : (
          <RankGame />
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
