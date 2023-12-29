import styles from './OpponentMessage.module.scss'

interface OpponentMessageProps {
  nickname: string
  message: string
  time: string
}

function OpponentMessage(props: OpponentMessageProps): JSX.Element {
  return (
    <>
      <section className={styles.opponentMessage}>
        <div className={styles.opponentUserMessageAndTime}>
          {props.nickname && (
            <strong className={styles.opponentUserNickName}>{props.nickname}</strong>
          )}
          <div className={styles.opponentUserMessageTime}>{props.time}</div>
        </div>
        <div className={styles.opponentUserMessage}>{props.message}</div>
      </section>
    </>
  )
}

export default OpponentMessage
