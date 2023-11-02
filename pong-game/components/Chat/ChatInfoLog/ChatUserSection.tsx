import styles from './ChatUserSection.module.scss'
import ChatUserListContainer from './chatUserListContainer'

function ChatUserSection(): JSX.Element {
  return (
    <div className={styles.chatUserSection}>
      <ChatUserListContainer />
    </div>
  )
}

export default ChatUserSection
