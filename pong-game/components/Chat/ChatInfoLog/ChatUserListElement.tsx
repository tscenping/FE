import Image from 'next/image'
import styles from './ChatUserListElement.module.scss'
import userToggle from '@/public/img/chat/userToggle.svg'
import userImage from '@/public/img/chat/userProfileImage.svg'
import DropDown from '@/components/DropDown/DropDown'
import { useState } from 'react'

interface ChatUserListElementProps {
  channelUserId?: number
  userid?: number
  nickname?: string
  avatar?: string
  isFriend?: boolean
  isBlocked?: boolean
  channelUserType: string
}

function ChatUserListElement(props: ChatUserListElementProps): JSX.Element {
  const [dropDownState, setDropDownState] = useState(false)
  return (
    <li className={styles.chatUserListElement}>
      <section className={styles.userInfo}>
        <div className={styles.userProfileImage}>
          <Image src={props.avatar} alt={'user profile image'} width={35} height={35} />
        </div>
        <span className={styles.userNickName}>{props.nickname}</span>
      </section>
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
