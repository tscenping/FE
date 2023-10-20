import styles from '../../styles/components/Chat/ChatRoom.module.css'

function ChatRoom(): JSX.Element {
  return (
    <div className={styles.chatRoom}>
      <div className={styles.chatShow}>
        <div className={styles.chatLog}></div>
        <div className={styles.chatInput}></div>
      </div>
      <div className={styles.chatUserSection}>
        <div className={styles.chatUserList}></div>
      </div>
    </div>
  )
}

export default ChatRoom
