import FriendsNaviTab from './FriendsNaviTab'
import styles from './FriendTypeNaviContainer.module.scss'

interface FriendTypeNaviContainerProps {
  tabState: string
  setTabState: (v: string) => void
}

function FriendTypeNaviContainer({
  tabState,
  setTabState,
}: FriendTypeNaviContainerProps): JSX.Element {
  return (
    <div className={styles.friendTypeNaviContainer}>
      <FriendsNaviTab
        name={'friendUsers'}
        id={'frinedUsers'}
        value="1"
        tabState={tabState}
        setTabState={setTabState}
        title="친구목록"
      />
      <FriendsNaviTab
        name={'blockUsers'}
        id={'blockUsers'}
        value="2"
        tabState={tabState}
        setTabState={setTabState}
        title="차단목록"
      />
      <FriendsNaviTab
        name={'searchUsers'}
        id={'searchUsers'}
        value="3"
        tabState={tabState}
        setTabState={setTabState}
        title="유저검색"
      />
    </div>
  )
}

export default FriendTypeNaviContainer
