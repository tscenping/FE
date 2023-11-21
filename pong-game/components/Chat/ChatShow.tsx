import Image from 'next/image'
import styles from './ChatShow.module.scss'
import ChatLog from './ChatInfoLog/ChatLog'
import ChatInfo from './ChatInfoLog/ChatInfo'
import submitMessage from '@/public/img/chat/enterInput.svg'
import ChatPassword from './ChatInfoLog/ChatPassword'

function ChatShow(): JSX.Element {
  return (
    <div className={styles.chatShow}>
      <div className={styles.chatInfoLog}>
        <ChatInfo />
        {/* <ChatLog /> */}
        <ChatPassword />
      </div>
      <form className={styles.chatInput}>
        <input type="text" className={styles.messageInput} required />
        <span className={styles.folderNameInputPlaceHolder}>Message Input</span>
        <button className={styles.submitMessage}>
          <Image src={submitMessage} alt={'submit message'} />
        </button>
      </form>
    </div>
  )
}

export default ChatShow
