import Image from 'next/image'
import styles from './ChatInfo.module.scss'
import channelInvite from '@/public/img/chat/channelInvite.svg'
import channelSetting from '@/public/img/chat/channelSetting.svg'
import roomOut from '@/public/img/chat/roomOut.svg'
import { useJoinChannel, useJoinProtectedChannel } from '@/store/chat'
import { useModalState } from '@/store/store'

function ChatInfo(): JSX.Element {
  const { channelAuth, channelType, channelTitle, channelId } = useJoinChannel()
  const { setModalName } = useModalState()

  const channelInviteIcon = //채널의 타입이 "PRIVATE"가 아니고 혹은 채널의 타입은 "PRIVATE"이지만 유저의 권한이 "MEMBER"일때
    channelType !== 'PRIVATE' || channelAuth === 'MEMBER' ? styles.none : styles.show

  const channelSettingIcon = //채널의 타입이 "PROTECTED"이거나 "PUBLIC"이고 채널의 "OWNER"일때
    (channelType === 'PROTECTED' || channelType === 'PUBLIC') && channelAuth === 'OWNER'
      ? styles.show
      : styles.none

  const exitChannelHandler = (e) => {
    setModalName('exitRoom')
  }
  console.log(channelTitle)
  return (
    <div className={styles.chatInfo}>
      <span>
        <Image
          src={channelInvite}
          alt={'out room'}
          width={50}
          className={`${styles.channelInvite} ${channelInviteIcon}`}
        />
      </span>
      <strong>{channelTitle}</strong>
      <section className={styles.channelIcon}>
        <Image
          src={channelSetting}
          alt={'channel setting'}
          width={40}
          className={`${styles.channelSetting} ${channelSettingIcon}`}
        />
        <span onClick={exitChannelHandler} className={styles.exitRoom}>
          <Image src={roomOut} alt={'roomOut'} />
        </span>
      </section>
    </div>
  )
}

export default ChatInfo
