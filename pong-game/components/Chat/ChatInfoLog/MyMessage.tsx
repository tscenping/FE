import styles from './Mymessage.module.scss'

function MyMessage(): JSX.Element {
  return (
    <section className={styles.myMessage}>
      <div className={styles.myMessageContainer}>
        <div className={styles.myUserMessageAndTime}>
          {/* <div className={styles.myUserMessageTime}>12 : 32</div> */}
          <strong className={styles.myUserNickName}>sangyeki</strong>
        </div>
        <div className={styles.myUserMessage}>
          저는 말하는 감자입니다 저는 말하는 감자입니다 저는 말하는 감자입니다
        </div>
      </div>
    </section>
  )
}

export default MyMessage
