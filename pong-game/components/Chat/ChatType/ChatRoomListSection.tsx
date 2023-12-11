import styles from './ChatRoomListSection.module.scss'
import CreatedRoomList from './CreatedRoomList'
import { useGetChannels } from '@/store/chat'

function ChatRoomListSection(): JSX.Element {
  const { allChannels } = useGetChannels()
  const channelsToRender = allChannels || []

  return (
    <>
      {channelsToRender.length > 0 ? (
        <ul className={styles.chatRoomListSection}>
          {channelsToRender.map((channel) => (
            <CreatedRoomList
              key={channel.channelId}
              title={channel.name}
              channelId={channel.channelId}
              channelType={channel.channelType}
              entered={false}
              userCount={channel.userCount}
              isJoined={channel.isJoined}
            />
          ))}
        </ul>
      ) : (
        <strong className={styles.noChannel}>생성된 채널이 없습니다.</strong>
      )}
    </>
  )
}

export default ChatRoomListSection
