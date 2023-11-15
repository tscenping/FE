import styles from './Loading.module.scss'

function Loading(): JSX.Element {
  return (
    <div className={styles.loadingComponent}>
      <p className={styles.loadingTitle}>Loading...</p>
      {/* <div className={styles.loadingBall}>
        <div className={styles.ballOne}></div>
        <div className={styles.ballTwo}></div>
        <div className={styles.ballThree}></div>
      </div> */}
    </div>
  )
}

export default Loading
