import styles1 from './DropDown.module.scss'
import styles from '@/pages/rank/rank.module.scss'
import DropDownUserProfile from './DropDownUserProfile'

interface dropDownProps {
  isDropDownView: boolean
  dropDownState: 'userProfile' | 'chating' | 'friendList'
  userProfile?: userProfileDorpDownProps
}

interface userProfileDorpDownProps {
  isFriend: boolean
  isBlock: boolean
}

export default function DropDown({ isDropDownView, dropDownState, userProfile }: dropDownProps) {
  const content: { [key: string]: JSX.Element | null } = {
    userProfile: (
      <DropDownUserProfile isBlock={userProfile?.isBlock} isFriend={userProfile?.isFriend} />
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
