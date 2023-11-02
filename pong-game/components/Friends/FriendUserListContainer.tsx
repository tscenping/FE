import Image from 'next/image'
import styles from './FriendUserListContainer.module.scss'
import profileImage from '@/public/img/chat/userProfileImage.svg'
import toggle from '@/public/img/chat/userToggle.svg'

function FriendUserListContainer(): JSX.Element {
  return (
    <>
      <li className={styles.friendUserListContainer}>
        <div className={styles.friendUserImageNickName}>
          <Image src={profileImage} alt={'user profile image'} width={80} height={80} />
          <strong>sangyeki</strong>
        </div>
        <div className={styles.friendUserToggle}>
          <Image src={toggle} alt={'user edit toggle button'} />
        </div>
      </li>
    </>
  )
}

export default FriendUserListContainer
