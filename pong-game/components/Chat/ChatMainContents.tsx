import styles from '../../styles/components/Chat/ChatMainContents.module.css'
import ChatRoomList from './ChatRoomList'
import ChatRoom from './ChatRoom'

function ChatMainContents(): JSX.Element {
  return (
    <div className={styles.chatMainContents}>
      <ChatRoomList />
      <ChatRoom />
    </div>
  )
}

export default ChatMainContents
