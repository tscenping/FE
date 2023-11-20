import Image from 'next/image'
import styles from './ChatUserListElement.module.scss'
import userToggle from '@/public/img/chat/userToggle.svg'
import userImage from '@/public/img/chat/userProfileImage.svg'
import DropDown from '@/components/DropDown/DropDown'
import { useState } from 'react'

function ChatUserListElement(): JSX.Element {
  const [dropDownState, setDropDownState] = useState(false)
  return (
    <li className={styles.chatUserListElement}>
      <div className={styles.userProfileImage}>
        <Image src={userImage} alt={'user profile image'} />
      </div>
      <span className={styles.userNickName}>sangyeki</span>
      <Image
        src={userToggle}
        alt={'user function'}
        width={15}
        height={15}
        onClick={() => setDropDownState((prev) => !prev)}
      />
      {dropDownState && (
        <DropDown
          isDropDownView={dropDownState}
          setIsDropDownView={setDropDownState}
          dropDownState="chating"
          userProfile={{
            id: 3,
            nickname: 'him',
            avatar: '1',
            isFriend: true,
            isBlocked: false,
          }}
          chating={{
            id: 3,
            nickname: 'him',
            avatar: '1',
            isFriend: true,
            isBlocked: false,
            myChannelUserType: 'ADMIN',
            channelUserType: 'COMMON',
          }}
        />
      )}
    </li>
  )
}

export default ChatUserListElement
