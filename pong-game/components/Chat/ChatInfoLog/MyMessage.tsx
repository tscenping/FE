import styles from './Mymessage.module.scss'

interface MyMessageProps {
  nickname: string
  message: string
  time: string
}

function MyMessage(props: MyMessageProps): JSX.Element {
  return (
    <section className={styles.myMessage}>
      <div className={styles.myMessageContainer}>
        <div className={styles.myUserMessageAndTime}>
          <div className={styles.myUserMessageTime}>{props.time}</div>
          <strong className={styles.myUserNickName}>{props.nickname}</strong>
        </div>
        <div className={styles.myUserMessage}>{props.message}</div>
      </div>
    </section>
  )
}

export default MyMessage
