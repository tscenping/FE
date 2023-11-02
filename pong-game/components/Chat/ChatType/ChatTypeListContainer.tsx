import styles from './ChatTypeListContainer.module.scss'
import ChatDmRoomListSection from './ChatDmRoomListSection'
import ChatRoomListSection from './ChatRoomListSection'
import { useNavBarState } from '@/store/chat'

function ChatTypeListContainer(): JSX.Element {
  const { tabState } = useNavBarState()
  return (
    <div className={styles.chatTypeListContainer}>
      {tabState === '1' && <ChatRoomListSection />}
      {tabState === '2' && <ChatRoomListSection />}
      {tabState === '3' && <ChatDmRoomListSection />}
    </div>
  )
}

export default ChatTypeListContainer
