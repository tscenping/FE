import styles from './ChatLog.module.scss'
import OpponentMessage from './OpponentMessage'
import MyMessage from './Mymessage'

function ChatLog(): JSX.Element {
  return (
    <div className={styles.chatLog}>
      <OpponentMessage />
      <MyMessage />
      <OpponentMessage />
      <MyMessage />
      <OpponentMessage />
      <MyMessage />
      <OpponentMessage />
      <MyMessage />
      <OpponentMessage />
      <MyMessage />
      <OpponentMessage />
      <MyMessage />
      <OpponentMessage />
      <MyMessage />
      <OpponentMessage />
      <MyMessage />
      <OpponentMessage />
      <OpponentMessage />
      <OpponentMessage />
    </div>
  )
}

export default ChatLog
