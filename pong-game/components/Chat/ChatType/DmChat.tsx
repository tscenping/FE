import Image from 'next/image'
import OpponentProfileImage from '../../../public/img/chat/DmChatImage.svg'
import styles from './DmChat.module.scss'

function DmChat(): JSX.Element {
  return (
    <li className={styles.dmChatListContainer}>
      <div className={styles.profileImage}>
        <Image src={OpponentProfileImage} alt={'Opponent Profile image'} width={50} height={50} />
      </div>
      <span className={styles.opponentNickName}>nickName</span>
    </li>
  )
}

export default DmChat
