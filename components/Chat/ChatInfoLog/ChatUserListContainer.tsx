import styles from './ChatUserListContainer.module.scss'
import ChatUserListElement from './ChatUserListElement'
import { useJoinChannel } from '@/store/chat'

function ChatUserListContainer(): JSX.Element {
  const { channelUserInfo } = useJoinChannel()

  return (
    <ul className={styles.chatUserListContainer}>
      {channelUserInfo &&
        channelUserInfo.map((user) => (
          <ChatUserListElement
            key={user.userId}
            userId={user.userId}
            nickname={user.nickname}
            channelUserId={user.channelUserId}
            avatar={user.avatar}
            isFriend={user.isFriend}
            isBlocked={user.isBlocked}
            channelUserType={user.channelUserType}
          />
        ))}
    </ul>
  )
}

export default ChatUserListContainer
