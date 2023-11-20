import styles from './ChatListNavBarContainer.module.scss'
import ChatRoomListTab from '../ChatRoomListTab'
import Image from 'next/image'
import { useNavBarState } from '@/store/chat'
import addDmChat from '@/public/img/chat/addDmChat.svg'
import makeChatRoom from '@/public/img/chat/makeChat.svg'
import { useModalState } from '@/store/store'

function ChatListNavBarContainer(): JSX.Element {
  const { setModalName } = useModalState()
  const { tabState } = useNavBarState()

  const createRoomModalHandler = (event) => {
    setModalName('createChatRoom')
  }

  const createDmModalHandler = (event) => {
    setModalName('createDmRoom')
  }

  return (
    <nav className={styles.chatListNavBarContainer}>
      <ChatRoomListTab name="tab" id="entireList" value="1" tabState={tabState} title="전체 목록" />
      <ChatRoomListTab name="tab" id="joined" value="2" tabState={tabState} title="참여 목록" />
      <ChatRoomListTab
        name="tab"
        id="facetoface"
        value="3"
        tabState={tabState}
        title="1:1 메세지"
      />
      {tabState === '3' ? (
        <Image
          src={addDmChat}
          alt={'make dm chat'}
          className={styles.createDmChat}
          onClick={createDmModalHandler}
        />
      ) : (
        <Image
          src={makeChatRoom}
          alt={'make chat room'}
          width={40}
          height={40}
          className={styles.createChatRoom}
          onClick={createRoomModalHandler}
        />
      )}
    </nav>
  )
}

export default ChatListNavBarContainer
