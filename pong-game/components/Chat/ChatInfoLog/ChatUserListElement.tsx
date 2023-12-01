import Image from 'next/image'
import styles from './ChatUserListElement.module.scss'
import userToggle from '@/public/img/chat/userToggle.svg'
import userImage from '@/public/img/chat/userProfileImage.svg'
import DropDown from '@/components/DropDown/DropDown'
import { useState } from 'react'
import { useJoinChannel } from '@/store/chat'
import { useNickNameImage } from '@/store/login'

interface ChatUserListElementProps {
  channelUserId?: number
  userId?: number
  nickname?: string
  avatar?: string
  isFriend?: boolean
  isBlocked?: boolean
  channelUserType: 'OWNER' | 'ADMIN' | 'COMMON'
}

function ChatUserListElement(props: ChatUserListElementProps): JSX.Element {
  const [dropDownState, setDropDownState] = useState(false)
  const { myNickname } = useNickNameImage()
  const { myChannelUserType } = useJoinChannel()
  return (
    <li className={styles.chatUserListElement}>
      <section className={styles.userInfo}>
        <div className={styles.userProfileImage}>
          <Image src={props.avatar} alt={'user profile image'} width={35} height={35} />
        </div>
        <span className={styles.userNickName}>{props.nickname}</span>
      </section>
      {props.nickname !== myNickname && (
        <Image
          src={userToggle}
          alt={'user function'}
          width={15}
          height={15}
          onClick={() => setDropDownState((prev) => !prev)}
        />
      )}
      {dropDownState && (
        <DropDown
          isDropDownView={dropDownState}
          setIsDropDownView={setDropDownState}
          dropDownState="chating"
          userProfile={{
            id: props.userId,
            nickname: props.nickname,
            avatar: props.avatar,
            isFriend: props.isFriend,
            isBlocked: props.isBlocked,
          }}
          chating={{
            id: props.userId,
            myChannelUserType: myChannelUserType,
            channelUserId: props.channelUserId,
            nickname: props.nickname,
            avatar: props.avatar,
            isFriend: props.isFriend,
            isBlocked: props.isBlocked,
            channelUserType: props.channelUserType,
            setIsDropDownView: setDropDownState,
          }}
        />
      )}
    </li>
  )
}

export default ChatUserListElement
