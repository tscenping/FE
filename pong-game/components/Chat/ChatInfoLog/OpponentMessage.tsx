import styles from './OpponentMessage.module.scss'

function OpponentMessage(): JSX.Element {
  return (
    <>
      <section className={styles.opponentMessage}>
        <div className={styles.opponentUserMessageAndTime}>
          <strong className={styles.opponentUserNickName}>sangyeki</strong>
          {/* <div className={styles.opponentUserMessageTime}>12 : 32</div> */}
        </div>
        <div className={styles.opponentUserMessage}>
          누구세요? 누구세요?
          누구세요?누구세요?누구세요?누구세요?누구세요?누구세요?누구세요?누구세요?누구세요?누구세요?
        </div>
      </section>
    </>
  )
}

export default OpponentMessage
