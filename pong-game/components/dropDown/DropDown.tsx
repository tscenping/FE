import styles1 from './DropDown.module.scss'
import styles from '@/pages/rank/rank.module.scss'
import DropDownUserProfile from './DropDownUserProfile'
import DropDownChating from './DropDownChating'

interface dropDownProps {
  isDropDownView: boolean
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
  return (
    <>
      {isDropDownView && (
        <div className={`${styles.dropDown} ${styles1.dropDown}`}>{content[dropDownState]}</div>
      )}
    </>
  )
}
