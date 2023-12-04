import styles from './ChatDmRoomListSection.module.scss'
import DmChat from './DmChat'
import { useGetChannels } from '@/store/chat'

function ChatDmRoomListSection(): JSX.Element {
  const { dmChannels } = useGetChannels()

  return (
    <ul className={styles.chatDmRoomListSection}>
      {dmChannels &&
        dmChannels.map((dmChannel) => (
          <DmChat
            key={dmChannel.channelId}
            channelId={dmChannel.channelId}
            partnerName={dmChannel.partnerName}
            avatar={dmChannel.avatar}
            status={dmChannel.status}
          />
        ))}
    </ul>
  )
}

export default ChatDmRoomListSection
