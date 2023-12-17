import Image from 'next/image'
import styles from './ChatInfo.module.scss'
import channelInvite from '@/public/img/chat/channelInvite.svg'
import channelSetting from '@/public/img/chat/channelSetting.svg'
import roomOut from '@/public/img/chat/roomOut.svg'
import { useJoinChannel } from '@/store/chat'
import { useModalState } from '@/store/store'

function ChatInfo(): JSX.Element {
  const { channelAuth, channelType, channelTitle } = useJoinChannel()
  const { setModalName, setModalProps } = useModalState()

  const channelInviteIcon = //채널의 타입이 "PRIVATE"가 아니고 혹은 채널의 타입은 "PRIVATE"이지만 유저의 권한이 "MEMBER"일때
    channelType !== 'PRIVATE' || channelAuth === 'MEMBER' ? styles.inviteNone : styles.inviteShow

  const channelSettingIcon =
    (channelType === 'PROTECTED' || channelType === 'PUBLIC') && channelAuth === 'OWNER'
      ? styles.settingShow
      : channelType === 'DM' || channelAuth === 'MEMBER' || channelType === 'PRIVATE'
      ? styles.settingNone
      : styles.settingShow

  const inviteUserModalHandler = async () => {
    setModalProps({ modalType: 'INVITE' })
    setModalName('friendUsers')
  }

  const exitChannelHandler = (e) => {
    setModalName('exitRoom')
  }

  const channelSettingHandler = () => {
    setModalName('channelSetting')
  }

  return (
    <div className={styles.chatInfo}>
      <span className={styles.channelInviteIcon}>
        <Image
          src={channelInvite}
          alt={'out room'}
          width={40}
          className={`${styles.channelInvite} ${channelInviteIcon}`}
          onClick={inviteUserModalHandler}
        />
      </span>
      <section className={styles.channelTitle}>
        <strong>{channelTitle}</strong>
        <Image
          src={channelSetting}
          alt={'channel setting'}
          width={40}
          className={`${styles.channelSetting} ${channelSettingIcon}`}
          onClick={channelSettingHandler}
        />
      </section>
      <section className={styles.channelIcon}>
        <span onClick={exitChannelHandler} className={styles.exitRoom}>
          <Image src={roomOut} alt={'roomOut'} width={40} />
        </span>
      </section>
    </div>
  )
}

export default ChatInfo
