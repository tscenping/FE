import styles from './ChatDmRoomListSection.module.scss'
import DmChat from './DmChat'
import { useGetChannels } from '@/store/chat'

function ChatDmRoomListSection(): JSX.Element {
  const { dmChannels } = useGetChannels()

  return (
    <>
      {dmChannels.length > 0 ? (
        <ul className={styles.chatDmRoomListSection}>
          {dmChannels.map((dmChannel) => (
            <DmChat
              key={dmChannel.channelId}
              channelId={dmChannel.channelId}
              partnerName={dmChannel.partnerName}
              avatar={dmChannel.avatar}
              status={dmChannel.status}
            />
          ))}
        </ul>
      ) : (
        <strong className={styles.noDm}>참여한 1:1채널이 없습니다.</strong>
      )}
    </>
  )
}

export default ChatDmRoomListSection
