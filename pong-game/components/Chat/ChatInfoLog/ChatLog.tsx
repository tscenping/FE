import styles from './ChatLog.module.scss'
import OpponentMessage from './OpponentMessage'
import MyMessage from './MyMessage'
import { useJoinProtectedChannel } from '@/store/chat'

function ChatLog(): JSX.Element {
  const { passwordInputRender } = useJoinProtectedChannel()

  return (
    <div className={styles.chatLog}>
      {passwordInputRender === 'DEFAULT' && <p className={styles.defaultView}>42 pong</p>}
      {passwordInputRender === 'CHANNEL' && (
        <>
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
        </>
      )}
    </div>
  )
}

export default ChatLog
