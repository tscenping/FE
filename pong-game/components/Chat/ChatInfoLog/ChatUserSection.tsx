import styles from './ChatUserSection.module.scss'
import ChatUserListContainer from './ChatUserListContainer'

function ChatUserSection(): JSX.Element {
  
  return (
    <div className={styles.chatUserSection}>
      <ChatUserListContainer />
    </div>
  )
}

export default ChatUserSection
