import styles from './ChatRoomListSection.module.scss'
import CreatedRoomList from './CreatedRoomList'

function ChatRoomListSection(): JSX.Element {
  return (
    <ul className={styles.chatRoomListSection}>
      <CreatedRoomList title={'한글열글자한글열글자'} channelType={'PUBLIC'} />
      <CreatedRoomList title={'abcdefghij'} channelType={'PROTECTED'} />
      <CreatedRoomList title={'채팅방 3'} channelType={'PROTECTED'} />
      <CreatedRoomList title={'채팅방 4'} channelType={'PUBLIC'} />
      <CreatedRoomList title={'채팅방 5'} channelType={'PUBLIC'} />
      <CreatedRoomList title={'채팅방 6'} channelType={'PROTECTED'} />
      <CreatedRoomList title={'채팅방 7'} channelType={'PROTECTED'} />
      <CreatedRoomList title={'채팅방 8'} channelType={'PUBLIC'} />
      <CreatedRoomList title={'채팅방 9'} channelType={'PROTECTED'} />
      <CreatedRoomList title={'채팅방 10'} channelType={'PUBLIC'} />
    </ul>
  )
}

export default ChatRoomListSection
