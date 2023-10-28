import styles from './ChatRoomList.module.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import makeChatRoom from '@/public/img/chat/makeChat.svg'
import addDmChat from '@/public/img/chat/addDmChat.svg'
import CreatedRoomList from './CreatedRoomList'
import DmChat from './DmChat'
import ModalLayout from '../layout/ModalLayout'
import ChatRoomListTab from './ChatRoomListTab'

function ChatRoomList(): JSX.Element {
  const [tabState, setTabState] = useState('1')

  return (
    <div className={styles.chatListNavBar}>
      <nav className={styles.chatListNavBarContainer}>
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
        {tabState === '3' ? (
          <Image
            src={addDmChat}
            alt={'make dm chat'}
            className={styles.createDmChat}
          />
        ) : (
          <Image
            src={makeChatRoom}
            alt={'make chat room'}
            width={40}
            height={40}
            className={styles.createChatRoom}
          />
        )}
      </nav>
      {tabState === '3' && (
        <div className={styles.chatTypeListContainer}>
          <ul className={styles.chatDmRoomListSection}>
            <DmChat />
            <DmChat />
            <DmChat />
            <DmChat />
            <DmChat />
          </ul>
        </div>
      )}
      {tabState === '2' && (
        <div className={styles.chatTypeListContainer}>
          <ul className={styles.chatRoomListSection}>
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
            <CreatedRoomList title="채팅방 1" />
          </ul>
        </div>
      )}
      {tabState === '1' && (
        <div className={styles.chatTypeListContainer}>
          <ul className={styles.chatRoomListSection}>
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
