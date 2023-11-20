import styles from './ChatRoomList.module.scss'
import ModalLayout from '../Layout/ModalLayout'
import ChatListNavBarContainer from './ChatInfoLog/ChatListNavBarContainer'
import ChatTypeListContainer from './ChatType/ChatTypeListContainer'

function ChatRoomList(): JSX.Element {
  return (
    <div className={styles.chatListNavBar}>
      <ChatListNavBarContainer />
      <ChatTypeListContainer />
      <div></div> {/* page선택 섹션*/}
    </div>
  )
}

export default ChatRoomList
