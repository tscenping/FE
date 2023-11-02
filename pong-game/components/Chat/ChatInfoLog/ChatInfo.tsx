import Image from 'next/image'
import styles from './ChatInfo.module.scss'
import closeRoom from '@/public/img/chat/closeRoom.svg'
import roomOut from '@/public/img/chat/roomOut.svg'

function ChatInfo(): JSX.Element {
  return (
    <div className={styles.chatInfo}>
      <span>
        <Image src={closeRoom} alt={'out room'} />
      </span>
      <strong>트센</strong>
      <span>
        <Image src={roomOut} alt={'roomOut'} />
      </span>
    </div>
  )
}

export default ChatInfo
