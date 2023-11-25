import styles from './ChatRoomListSection.module.scss'
import CreatedRoomList from './CreatedRoomList'

function ChatRoomListSection(): JSX.Element {
  return (
    <ul className={styles.chatRoomListSection}>
      <CreatedRoomList title={'한글열글자한글열글자'} />
      <CreatedRoomList title={'abcdefghij'} />
      <CreatedRoomList title={'채팅방 3'} />
      <CreatedRoomList title={'채팅방 4'} />
      <CreatedRoomList title={'채팅방 5'} />
      <CreatedRoomList title={'채팅방 6'} />
      <CreatedRoomList title={'채팅방 7'} />
      <CreatedRoomList title={'채팅방 8'} />
      <CreatedRoomList title={'채팅방 9'} />
      <CreatedRoomList title={'채팅방 10'} />
    </ul>
  )
}

export default ChatRoomListSection
