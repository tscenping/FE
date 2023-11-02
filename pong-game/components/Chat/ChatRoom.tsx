import styles from './ChatRoom.module.scss'
import ChatShow from './ChatShow'
import ChatUserSection from './ChatInfoLog/ChatUserSection'

function ChatRoom(): JSX.Element {
  return (
    <div className={styles.chatRoom}>
      <ChatShow />
      <ChatUserSection />
    </div>
  )
}

export default ChatRoom
