import styles from '../../styles/components/Chat/ChatMainContents.module.css'
import ChatRoomList from './ChatRoomList'

function ChatMainContents(): JSX.Element {
  return (
    <div className={styles.chatMainContents}>
      <ChatRoomList />
    </div>
  )
}

export default ChatMainContents
