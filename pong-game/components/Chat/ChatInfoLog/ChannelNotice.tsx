import styles from './ChannelNotice.module.scss'

function ChannelNotice(): JSX.Element {
  return (
    <div className={styles.channelNotice}>
      <div></div>
      <strong className={styles.channelNoticeMessage}>
        "해당 유저"님이 관리자로 임명되었습니다.
      </strong>
      <div></div>
    </div>
  )
}

export default ChannelNotice
