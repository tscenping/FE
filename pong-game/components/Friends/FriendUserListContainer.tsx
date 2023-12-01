import Image from 'next/image'
import styles from './FriendUserListContainer.module.scss'
import profileImage from '@/public/img/chat/userProfileImage.svg'
import toggle from '@/public/img/chat/userToggle.svg'
import React, { useState } from 'react'
import DropDown from '../DropDown/DropDown'

interface FriendUserListContainerprops {
  nickname: string
  avatar: string
  id: number
  status: string
  isFriend: boolean
  isBlocked: boolean
}

function FriendUserListContainer(props: FriendUserListContainerprops): JSX.Element {
  const [dropDownState, setDropDownState] = useState(false)
  return (
    <>
      <li className={styles.friendUserListContainer}>
        <div className={styles.friendUserImageNickName}>
          <Image src={profileImage} alt={'user profile image'} width={80} height={80} />
          <strong>{props.nickname}</strong>
        </div>
        <div className={styles.friendUserToggle}>
          <Image
            src={toggle}
            alt={'user edit toggle button'}
            onClick={() => setDropDownState((prev) => !prev)}
          />
          <div>
            {dropDownState && (
              <DropDown
                isDropDownView={dropDownState}
                setIsDropDownView={setDropDownState}
                dropDownState="userProfile"
                userProfile={{
                  id: props.id,
                  nickname: props.nickname,
                  avatar: props.avatar,
                  isFriend: props.isFriend,
                  isBlocked: props.isBlocked,
                }}
              />
            )}
          </div>
        </div>
      </li>
    </>
  )
}

export default FriendUserListContainer
