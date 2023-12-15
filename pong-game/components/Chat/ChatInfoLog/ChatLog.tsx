import { useEffect, useRef } from 'react'
import styles from './ChatLog.module.scss'
import { useNickNameImage } from '@/store/login'
import { useJoinProtectedChannel, useJoinChannel } from '@/store/chat'
import MyMessage from './MyMessage'
import OpponentMessage from './OpponentMessage'
import ChannelNotice from './ChannelNotice'

function ChatLog(): JSX.Element {
  const { passwordInputRender } = useJoinProtectedChannel()
  const { channelLog, setChannelLog } = useJoinChannel()
  const { myNickname } = useNickNameImage()
  const messageEndRef = useRef<HTMLDivElement | null>(null)

  const channelMessage = channelLog.map((message) => {
    // return <ChannelNotice />
    if (myNickname !== message.nickname) {
      return (
        <OpponentMessage
          nickname={message.nickname}
          message={message.message}
          time={message.time}
        />
      )
    } else {
      return <MyMessage nickname={message.nickname} message={message.message} time={message.time} />
    }
  })

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [channelMessage])

  return (
    <div className={styles.chatLog}>
      {passwordInputRender === 'DEFAULT' && <p className={styles.defaultView}>42 pong</p>}
      {passwordInputRender === 'CHANNEL' && <>{channelMessage}</>}
      <div ref={messageEndRef}></div>
    </div>
  )
}

export default ChatLog
