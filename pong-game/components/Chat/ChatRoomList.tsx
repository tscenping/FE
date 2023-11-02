import styles from './ChatRoomList.module.scss'
import ModalLayout from '../layout/ModalLayout'
import { useNavBarState } from '@/store/chat'
import ChatListNavBarContainer from './ChatInfoLog/ChatListNavBarContainer'
import ChatTypeListContainer from './ChatType/ChatTypeListContainer'

function ChatRoomList(): JSX.Element {
  const { tabState } = useNavBarState()
  return (
    <div className={styles.chatListNavBar}>
      <ChatListNavBarContainer />
      <ChatTypeListContainer />
      <div></div> {/* page선택 섹션*/}
    </div>
  )
}

export default ChatRoomList
