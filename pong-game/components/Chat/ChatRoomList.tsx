import styles from '@/styles/components/Chat/ChatRoomList.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import makeChatRoom from '@/public/img/chat/makeChat.svg'
import addDmChat from '@/public/img/chat/addDmChat.svg'
import CreatedRoomList from './CreatedRoomList'
import DmChat from './DmChat'
import ModalLayout from '../layout/ModalLayout'

function ChatRoomList(): JSX.Element {
  const [tabState, setTabState] = useState('1')

  return (
    <div className={styles.chatRoomList}>
      <nav className={styles.chatNavBarContainer}>
        <span>
          <input
            type="radio"
            name="tab"
            id="entireList"
            value={1}
            checked={tabState == '1'}
            onChange={() => setTabState('1')}
          />
          <label
            htmlFor="entireList"
            className={tabState === '1' ? styles.checkList : ''}
          >
            전체 목록
          </label>
        </span>
        <span>
          <input
            type="radio"
            name="tab"
            id="enterChat"
            value="2"
            onChange={() => setTabState('2')}
          />
          <label
            htmlFor="enterChat"
            className={tabState === '2' ? styles.checkList : ''}
          >
            참여 목록
          </label>
        </span>
        <span>
          <input
            type="radio"
            name="tab"
            id="facetoface"
            value="3"
            onChange={() => setTabState('3')}
          />
          <label
            htmlFor="facetoface"
            className={tabState === '3' ? styles.checkList : ''}
          >
            1:1 메세지
          </label>
        </span>
        {tabState === '3' ? (
          <Image src={addDmChat} alt={'make dm chat'} />
        ) : (
          <Image src={makeChatRoom} alt={'make chat room'} />
        )}
      </nav>
      {tabState === '3' && (
        <div className={styles.chatRoomListContainer}>
          <ul className={styles.chatRoomListSection2}>
            <DmChat />
            <DmChat />
            <DmChat />
            <DmChat />
            <DmChat />
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
