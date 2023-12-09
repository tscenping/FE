import styles from './Loading.module.scss'

function Loading(): JSX.Element {
  return (
    <div className={styles.loadingComponent}>
      <p className={styles.loadingTitle}>Loading</p>
      <div className={styles.dotContainer}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  )
}

export default Loading
