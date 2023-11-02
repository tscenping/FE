import styles from './ChatUserListContainer.module.scss'
import ChatUserListElement from './ChatUserListElement'

function ChatUserListContainer(): JSX.Element {
  return (
    <ul className={styles.chatUserListContainer}>
      <ChatUserListElement />
      <ChatUserListElement />
      <ChatUserListElement />
      <ChatUserListElement />
      <ChatUserListElement />
    </ul>
  )
}

export default ChatUserListContainer