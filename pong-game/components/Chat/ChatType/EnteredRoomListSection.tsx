import styles from './EnteredRoomListSection.module.scss'
import CreatedRoomList from './CreatedRoomList'

function EnteredRoomListSection(): JSX.Element {
  return (
    <ul className={styles.chatRoomListSection}>
      <CreatedRoomList
        title={'한글열글자한글열글자'}
        channelType={'PUBLIC'}
        channelId={1}
        entered={true}
      />
      <CreatedRoomList
        title={'abcdefghij'}
        channelType={'PROTECTED'}
        channelId={10}
        entered={true}
      />
      <CreatedRoomList title={'채팅방 3'} channelType={'PROTECTED'} channelId={2} entered={true} />
      <CreatedRoomList title={'채팅방 4'} channelType={'PUBLIC'} channelId={3} entered={true} />
      <CreatedRoomList title={'채팅방 5'} channelType={'PUBLIC'} channelId={4} entered={true} />
      <CreatedRoomList title={'채팅방 6'} channelType={'PROTECTED'} channelId={5} entered={true} />
      <CreatedRoomList title={'채팅방 7'} channelType={'PROTECTED'} channelId={6} entered={true} />
      <CreatedRoomList title={'채팅방 8'} channelType={'PUBLIC'} channelId={7} entered={true} />
      <CreatedRoomList title={'채팅방 9'} channelType={'PROTECTED'} channelId={8} entered={true} />
      <CreatedRoomList title={'채팅방 10'} channelType={'PUBLIC'} channelId={9} entered={true} />
    </ul>
  )
}

export default EnteredRoomListSection
