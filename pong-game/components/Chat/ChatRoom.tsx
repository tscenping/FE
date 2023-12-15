import { useEffect } from 'react'
import styles from './ChatRoom.module.scss'
import ChatShow from './ChatShow'
import ChatUserSection from './ChatInfoLog/ChatUserSection'
import { useJoinChannel } from '@/store/chat'
import { instance } from '@/util/axios'

function ChatRoom(): JSX.Element {
  const { setChannelUserInfo, channelId } = useJoinChannel()

  useEffect(() => {
    if (channelId) {
      const channelUserInfoHandler = async () => {
        const response = await instance(`/channels/enter/${channelId}`, {
          method: 'get',
        })
        setChannelUserInfo(response.data.channelUsers)
      }
      channelUserInfoHandler()
    }
    return () => {
      setChannelUserInfo(null)
    }
  }, [])

  return (
    <div className={styles.chatRoom}>
      <ChatShow />
      <ChatUserSection />
    </div>
  )
}

export default ChatRoom
