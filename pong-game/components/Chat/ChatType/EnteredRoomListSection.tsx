import styles from './EnteredRoomListSection.module.scss'
import CreatedRoomList from './CreatedRoomList'
import { useGetChannels } from '@/store/chat'

function EnteredRoomListSection(): JSX.Element {
  const { meChannels } = useGetChannels()

  return (
    <>
      {meChannels && meChannels.length > 0 ? ( //"meChannels" 에 채널목록이 존재하고 1개의 채널이라도 있다면
        <ul className={styles.chatRoomListSection}>
          {meChannels.map((channel) => (
            <CreatedRoomList
              key={channel.channelId}
              title={channel.name}
              channelId={channel.channelId}
              channelType={channel.channelType}
              entered={true}
              userCount={channel.userCount}
              isJoined={channel.isJoined}
            />
          ))}
        </ul>
      ) : (
        <strong className={styles.noEntered}>참여한 채널이 없습니다.</strong>
      )}
    </>
  )
}

export default EnteredRoomListSection
