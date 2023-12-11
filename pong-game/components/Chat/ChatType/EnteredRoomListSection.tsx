import styles from './EnteredRoomListSection.module.scss'
import CreatedRoomList from './CreatedRoomList'
import { useGetChannels } from '@/store/chat'

function EnteredRoomListSection(): JSX.Element {
  const { meChannels } = useGetChannels()

  return (
    <>
      {meChannels.length > 0 ? (
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
