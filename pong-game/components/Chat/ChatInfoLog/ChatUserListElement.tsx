import Image from 'next/image'
import styles from './ChatUserListElement.module.scss'
import userToggle from '@/public/img/chat/userToggle.svg'
import userImage from '@/public/img/chat/userProfileImage.svg'

function ChatUserListElement(): JSX.Element {
  return (
    <li className={styles.chatUserListElement}>
      <div className={styles.userProfileImage}>
        <Image src={userImage} alt={'user profile image'} />
      </div>
      <span className={styles.userNickName}>sangyeki</span>
      <Image src={userToggle} alt={'user function'} width={15} height={15} />
    </li>
  )
}

export default ChatUserListElement
