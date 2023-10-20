import styles from '../../styles/components/Chat/ChatRoomList.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import makeChatRoom from '../../public/img/chat/makeChat.svg'
import CreatedRoomList from './CreatedRoomList'
import ChatRoomListTab from './ChatRoomListTab'

function ChatRoomList(): JSX.Element {
  const [tabState, setTabState] = useState('1')

  return (
    <div className={styles.chatRoomList}>
      <nav className={styles.chatNavBarContainer}>
        <ChatRoomListTab
          name="tab"
          id="entireList"
          value="1"
          tabState={tabState}
          setTabState={setTabState}
          title="전체 목록"
        />
        <ChatRoomListTab
          name="tab"
          id="joined"
          value="2"
          tabState={tabState}
          setTabState={setTabState}
          title="참여 목록"
        />
        <ChatRoomListTab
          name="tab"
          id="facetoface"
          value="3"
          tabState={tabState}
          setTabState={setTabState}
          title="1:1 메세지"
        />
        <Image src={makeChatRoom} alt={'make chat room'} />
      </nav>
      {tabState === '3' && (
        <div className={styles.chatRoomListContainer}>
          <ul className={styles.chatRoomListSection}>
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
          </ul>
        </div>
      )}
      {tabState === '2' && (
        <div className={styles.chatRoomListContainer}>
          <ul className={styles.chatRoomListSection}>
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
          </ul>
        </div>
      )}
      {tabState === '1' && (
        <div className={styles.chatRoomListContainer}>
          <ul className={styles.chatRoomListSection}>
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
          </ul>
        </div>
      )}
      <div></div> {/* page선택 섹션*/}
    </div>
  )
}

export default ChatRoomList
