import styles from '../../styles/components/Login/LoginPageTitle.module.css'

function LoginPageTitle(): JSX.Element {
  return (
    <div className={styles.loginPageTitleContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleFirstLine}>코딩에 지쳤다면</h1>
        <h1 className={styles.titleSecondLine}>잠시만 쉬어가세요.</h1>
        <h1 className={styles.mainTitle}>42 PONG</h1>
      </div>
    </div>
  )
}

export default LoginPageTitle
