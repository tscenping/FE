import Image from 'next/image'
import styles from './ChatInfo.module.scss'
import closeRoom from '@/public/img/chat/closeRoom.svg'
import roomOut from '@/public/img/chat/roomOut.svg'
import { useJoinProtectedChannel } from '@/store/chat'
import { useModalState } from '@/store/store'
import { instance } from '@/util/axios'

function ChatInfo(): JSX.Element {
  const { channelTitle, channelId } = useJoinProtectedChannel()
  const { setModalName } = useModalState()

  const exitChannelHandler = (e) => {
    setModalName('exitRoom')
  }
  return (
    <div className={styles.chatInfo}>
      <span>
        <Image src={closeRoom} alt={'out room'} />
      </span>
      <strong>{channelTitle}</strong>
      <span onClick={exitChannelHandler} className={styles.exitRoom}>
        <Image src={roomOut} alt={'roomOut'} />
      </span>
    </div>
  )
}

export default ChatInfo
