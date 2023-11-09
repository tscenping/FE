import styles1 from './DropDown.module.scss'
import styles from '@/pages/rank/rank.module.scss'
import DropDownUserProfile from './DropDownUserProfile'
import DropDownChating from './DropDownChating'
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
  isFriend: boolean
  isBlock: boolean
}

interface DropDownChatingProps {
  isFriend: boolean
  isBlock: boolean
  isOwner: boolean
  isAdmin: boolean
  isMeAdmin: boolean
  isMeOwner: boolean
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
      <DropDownUserProfile isBlock={userProfile?.isBlock} isFriend={userProfile?.isFriend} />
    ),
    chating: (
      <DropDownChating
        isAdmin={chating?.isAdmin}
        isBlock={chating?.isBlock}
        isFriend={chating?.isFriend}
        isMeAdmin={chating?.isMeAdmin}
        isMeOwner={chating?.isMeOwner}
        isOwner={chating?.isOwner}
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
