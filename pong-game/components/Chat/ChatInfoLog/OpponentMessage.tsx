import styles from './OpponentMessage.module.scss'

interface OpponentMessageProps {
  nickname: string
  message: string
}

function OpponentMessage(props: OpponentMessageProps): JSX.Element {
  return (
    <>
      <section className={styles.opponentMessage}>
        <div className={styles.opponentUserMessageAndTime}>
          <strong className={styles.opponentUserNickName}>{props.nickname}</strong>
          {/* <div className={styles.opponentUserMessageTime}>12 : 32</div> */}
        </div>
        <div className={styles.opponentUserMessage}>{props.message}</div>
      </section>
    </>
  )
}

export default OpponentMessage
