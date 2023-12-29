import FriendsNaviTab from './FriendsNaviTab'
import styles from './FriendTypeNaviContainer.module.scss'

interface FriendTypeNaviContainerProps {
  tabState: string
}

function FriendTypeNaviContainer({ tabState }: FriendTypeNaviContainerProps): JSX.Element {
  return (
    <div className={styles.friendTypeNaviContainer}>
      <FriendsNaviTab
        name={'friendUsers'}
        id={'frinedUsers'}
        value="ALL"
        tabState={tabState}
        title="친구목록"
      />
      <FriendsNaviTab
        name={'blockUsers'}
        id={'blockUsers'}
        value="BLOCK"
        tabState={tabState}
        title="차단목록"
      />
      <FriendsNaviTab
        name={'searchUsers'}
        id={'searchUsers'}
        value="SEARCH"
        tabState={tabState}
        title="유저검색"
      />
    </div>
  )
}

export default FriendTypeNaviContainer
