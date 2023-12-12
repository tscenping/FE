import Image from 'next/image'
import styles from './SearchUserListContainer.module.scss'
import profileImage from '@/public/img/chat/userProfileImage.svg'
import toggle from '@/public/img/chat/userToggle.svg'
import React, { useState } from 'react'
import DropDown from '@/components/DropDown/DropDown'
import { useNickNameImage } from '@/store/login'
interface SearchUserListContainerprops {
  nickname: string
  avatar: string
  id: number
  isFriend: boolean
  isBlocked: boolean
}

function SearchUserListContainer(props: SearchUserListContainerprops): JSX.Element {
  const [dropDownState, setDropDownState] = useState(false)
  const { myNickname } = useNickNameImage()
  console.log(myNickname)
  console.log(props.nickname)
  return (
    <>
      <li className={styles.friendUserListContainer}>
        <div className={styles.friendUserImageNickName}>
          <Image src={props.avatar} alt={'user profile image'} width={80} height={80} />
          <strong>{props.nickname}</strong>
        </div>
        <div className={styles.friendUserToggle}>
          {myNickname !== props.nickname && (
            <Image
              src={toggle}
              alt={'user edit toggle button'}
              onClick={() => setDropDownState((prev) => !prev)}
            />
          )}
          <div>
            {dropDownState && (
              <DropDown
                isDropDownView={dropDownState}
                setIsDropDownView={setDropDownState}
                dropDownState="userProfile"
                userProfile={{
                  id: props.id,
                  nickname: props.nickname,
                  isFriend: props.isFriend,
                  isBlocked: props.isBlocked,
                  calledFrom: 'searchUserList',
                }}
              />
            )}
          </div>
        </div>
      </li>
    </>
  )
}

export default SearchUserListContainer
