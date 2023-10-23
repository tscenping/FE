import Image from 'next/image'
import OpponentProfileImage from '../../public/img/chat/DmChatImage.svg'
import styles from '../../styles/components/Chat/DmChat.module.css'

function DmChat(): JSX.Element {
  return (
    <li className={styles.dmChatListContainer}>
      <Image
        src={OpponentProfileImage}
        alt={'Opponent Profile image'}
        width={50}
        height={50}
      />
      <div className={styles.opponentLoginState}></div>
      <span className={styles.opponentNickName}>nickName</span>
    </li>
  )
}

export default DmChat
