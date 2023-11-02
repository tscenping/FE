import styles from './ChatRoomListSection.module.scss'
import CreatedRoomList from './CreatedRoomList'

function ChatRoomListSection(): JSX.Element {
  return (
    <ul className={styles.chatRoomListSection}>
      <CreatedRoomList title={'채팅방 1'} />
      <CreatedRoomList title={'채팅방 2'} />
      <CreatedRoomList title={'채팅방 3'} />
      <CreatedRoomList title={'채팅방 4'} />
      <CreatedRoomList title={'채팅방 5'} />
      <CreatedRoomList title={'채팅방 6'} />
    </ul>
  )
}

export default ChatRoomListSection
