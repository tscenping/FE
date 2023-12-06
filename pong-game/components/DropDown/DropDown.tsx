import styles1 from './DropDown.module.scss'
import styles from '@/pages/rank/rank.module.scss'
import DropDownUserProfile from './UserProfile/DropDownUserProfile'
import DropDownChating from './Chat/DropDownChating'
import { useEffect, useRef, useState } from 'react'
import useOutsideClickHandler from '@/hooks/useOutsideClickHandler'

interface dropDownProps {
  isDropDownView: boolean
  setIsDropDownView: (v: boolean) => void
  dropDownState: 'userProfile' | 'chating' | 'friendList'
  userProfile?: userProfileDorpDownProps
  chating?: DropDownChatingProps
}

interface userProfileDorpDownProps {
  id: number
  nickname: string
  isFriend: boolean
  isBlocked: boolean
  calledFrom?: 'searchUserList'
  // setIsDropDownView: (v: boolean) => void
}

interface DropDownChatingProps {
  id: number
  nickname: string
  isFriend: boolean
  channelUserId: number
  isBlocked: boolean
  myChannelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  setIsDropDownView: (v: boolean) => void
  setChannelUserType: (v: 'OWNER' | 'ADMIN' | 'MEMBER') => void
}

export default function DropDown({
  isDropDownView,
  setIsDropDownView,
  dropDownState,
  userProfile,
  chating,
}: dropDownProps) {
  const content: { [key: string]: JSX.Element | null } = {
    userProfile: (
      <DropDownUserProfile
        id={userProfile?.id}
        nickname={userProfile?.nickname}
        isFriend={userProfile?.isFriend}
        isBlocked={userProfile?.isBlocked}
        setIsDropDownView={setIsDropDownView}
        calledFrom={userProfile?.calledFrom}
      />
    ),
    chating: (
      <DropDownChating
        id={chating?.id}
        channelUserId={chating?.channelUserId}
        nickname={chating?.nickname}
        isFriend={chating?.isFriend}
        isBlocked={chating?.isBlocked}
        myChannelUserType={chating?.myChannelUserType}
        channelUserType={chating?.channelUserType}
        setChannelUserType={chating?.setChannelUserType}
        setIsDropDownView={setIsDropDownView}
      />
    ),
  }

  const modalRef = useRef<HTMLDivElement | null>(null)
  const handleModalClose = (): void => {
    setIsDropDownView(false)
  }

  useOutsideClickHandler(modalRef, handleModalClose)

  return (
    <>
      {/* {isDropDownView && (
        <div className={`${styles.dropDown} ${styles1.dropDown}`}>{content[dropDownState]}</div>
      )} */}
      <div className={isDropDownView ? styles.viewDropDown : styles.dropDown} ref={modalRef}>
        {content[dropDownState]}
      </div>
    </>
  )
}
