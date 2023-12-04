import Image from 'next/image'
import styles from './ChatUserListElement.module.scss'
import userToggle from '@/public/img/chat/userToggle.svg'
import admin from '@/public/img/chat/Admin.svg'
import owner from '@/public/img/chat/Owner.svg'
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
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
}

function ChatUserListElement(props: ChatUserListElementProps): JSX.Element {
  const [ChatUserListElementValue, setChatUserListElementValue] = useState(props)
  const [dropDownState, setDropDownState] = useState(false)
  const { myNickname } = useNickNameImage()
  const { myChannelUserType } = useJoinChannel()



  return (
    <li className={styles.chatUserListElement}>
      <section className={styles.userInfo}>
        <div className={styles.userProfileImage}>
          <Image src={props.avatar} alt={'user profile image'} width={45} height={45} />
        </div>
        <div className={styles.userNickName}>
          {props.channelUserType === 'ADMIN' && (
            <Image src={admin} alt={'admin user'} width={20} height={20} />
          )}
          {props.channelUserType === 'OWNER' && (
            <Image src={owner} alt={'owner user'} width={20} height={20} />
          )}
          <span>{props.nickname}</span>
        </div>
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
