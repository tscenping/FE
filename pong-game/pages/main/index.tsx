import Image from 'next/image'

import styles from '../../styles/main/index.module.scss'
import Layout from '@/components/layout/Layout'
import { useState } from 'react'
import NomalGame from '@/components/game/normalGame'
import RankGame from '@/components/game/rankGame'
import PageTitle from '@/components/UI/PageTitle'

export default function Home() {
  const [gameState, setGameState] = useState<string>('')
  const [pageState, setPageState] = useState(1)

  const onClickLadderBtn = () => {
    setGameState('rank')
    setPageState(2)
    console.log(gameState)
  }
  const onClickNomalBtn = () => {
    setGameState('nomal')
    setPageState(2)
    console.log(gameState)
  }

  return (
    <Layout>
      {/* <div>
        <div className={styles.title}>
          <h1 className={styles.mainTitle}>Game Start</h1>
          <div className={styles.subTitle}>
            일반게임과 래더게임 중 하나를 선택해주세요.
          </div>
        </div>
      </div> */}
      {/* <div className={styles.btn}>
        <button className={styles.gameBtn}>Ladder</button>
        <button className={styles.gameBtn}>Normal</button>
      </div> */}
      <div className={styles.backGround}>
          {gameState ? (
            gameState === 'nomal' ? (
              <NomalGame setPageState={setPageState} setGameState={setGameState}/>
            ) : (
              <RankGame />
            )
          ) : (
            <div>
              <section>
                <div className={styles.title}>
                  <PageTitle title="Game Start" subTitle="일반게임과 래더게임 중 하나를 선택해주세요."/>
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
      
    </Layout>
  )
}
