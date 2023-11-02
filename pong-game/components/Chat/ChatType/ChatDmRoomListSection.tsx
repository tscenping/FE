import styles from './ChatDmRoomListSection.module.scss'
import DmChat from './DmChat'

function ChatDmRoomListSection(): JSX.Element {
  return (
    <ul className={styles.chatDmRoomListSection}>
      <DmChat />
      <DmChat />
      <DmChat />
      <DmChat />
      <DmChat />
    </ul>
  )
}

export default ChatDmRoomListSection
