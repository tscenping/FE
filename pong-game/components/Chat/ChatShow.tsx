import { useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './ChatShow.module.scss'
import ChatLog from './ChatInfoLog/ChatLog'
import ChatInfo from './ChatInfoLog/ChatInfo'
import submitMessage from '@/public/img/chat/enterInput.svg'
import ChatPassword from './ChatInfoLog/ChatPassword'
import MessageInput from './Input/MessageInput'
import { useJoinProtectedChannel, useJoinChannel } from '@/store/chat'
import { socket } from '@/socket/socket'

function ChatShow(): JSX.Element {
  const messageRef = useRef<HTMLInputElement>(null)
  const { passwordInputRender } = useJoinProtectedChannel()
  const { channelId } = useJoinChannel()
  const showType = passwordInputRender === 'CHANNEL' ? styles.show : styles.none

  const messageHandler = (e) => {
    e.preventDefault()
    console.log(messageRef.current.value)
    try {
      socket.emit('message', { channelId: channelId, message: messageRef.current.value })
    } catch (error) {
      console.log('Error : ', error)
    }
    messageRef.current.value = ''
  }
  // socket.on('message', (msg) => console.log(msg))
  useEffect(() => {
    socket.on('message', (msg) => console.log(msg))
  }, [socket])
  return (
    <div className={styles.chatShow}>
      <div className={styles.chatInfoLog}>
        {passwordInputRender === 'CHANNEL' && <ChatInfo />}
        {passwordInputRender === 'PASSWORD' ? <ChatPassword /> : <ChatLog />}
        {/* "passwordInputRender값에 따라서 chat log에 보여줘야하는 컴포넌트를 결정 */}
        {/* <ChatPassword /> */}
      </div>
      <form className={`${styles.chatInput} ${showType}`} onSubmit={messageHandler}>
        <MessageInput messageRef={messageRef} />
        {/* <input type="text" className={styles.messageInput} required /> */}
        {/* <span className={styles.folderNameInputPlaceHolder}>Message Input</span> */}
        <button className={styles.submitMessage}>
          <Image src={submitMessage} alt={'submit message'} />
        </button>
      </form>
    </div>
  )
}

export default ChatShow
