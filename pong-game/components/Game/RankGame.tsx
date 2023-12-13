import styles from './RankGame.module.scss'

export default function RankGame() {
  
  return (
    <div>
      <section>
        <div className={styles.title}>
          <h1 className={styles.mainTitle}>Game Start</h1>
          <div className={styles.subTitle}>일반게임과 래더게임 중 하나를 선택해주세요.</div>
        </div>
      </section>
      <section className={styles.btn}>
        <button className={styles.gameBtn}>Matching</button>
        <button className={styles.gameBtn}>Invite a Friend</button>
      </section>
    </div>
  )
}
