import Image from 'next/image'
import styles from './ChatUserListElement.module.scss'
import userToggle from '@/public/img/chat/userToggle.svg'
import admin from '@/public/img/chat/admin.svg'
import owner from '@/public/img/chat/owner.svg'
import member from '@/public/img/chat/member.svg'
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
type ChannelUserType = 'OWNER' | 'ADMIN' | 'MEMBER'

function ChatUserListElement(props: ChatUserListElementProps): JSX.Element {
  const [dropDownState, setDropDownState] = useState(false)
  const { myNickname } = useNickNameImage()
  const { myChannelUserType, channelType } = useJoinChannel()

  const [channelUserType, setChannelUserType] = useState<ChannelUserType>(props.channelUserType)

  return (
    <li className={styles.chatUserListElement}>
      <section className={styles.userInfo}>
        {channelType !== 'DM' && (
          <>
            {props.channelUserType === 'ADMIN' && (
              <Image src={admin} alt={'admin user'} width={24} height={24} />
            )}
            {props.channelUserType === 'OWNER' && (
              <Image src={owner} alt={'owner user'} width={24} height={24} />
            )}
            {props.channelUserType === 'MEMBER' && (
              <Image src={member} alt={'member user'} width={24} height={24} />
            )}
          </>
        )}

        <div className={styles.userProfileImage}>
          <Image
            src={props.avatar}
            alt={'user profile image'}
            width={45}
            height={45}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.userNickName}>
          <span>{props.nickname}</span>
        </div>
      </section>
      {props.nickname !== myNickname && channelType !== 'DM' && (
        <Image
          src={userToggle}
          alt={'user function'}
          width={15}
          height={15}
          onClick={() => setDropDownState((prev) => !prev)}
          className={styles.dropdown}
        />
      )}
      {dropDownState && channelUserType && (
        <DropDown
          isDropDownView={dropDownState}
          setIsDropDownView={setDropDownState}
          dropDownState="chating"
          avatar={props.avatar}
          chating={{
            id: props.userId,
            myChannelUserType: myChannelUserType,
            channelUserId: props.channelUserId,
            nickname: props.nickname,
            isFriend: props.isFriend,
            isBlocked: props.isBlocked,
            channelUserType: props.channelUserType,
            setChannelUserType: setChannelUserType,
            setIsDropDownView: setDropDownState,
          }}
        />
      )}
    </li>
  )
}

export default ChatUserListElement
