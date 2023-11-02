import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'

function FrinedUsersListContainer(): JSX.Element {
  return (
    <ul className={styles.frinedUsersListContainer}>
      <FriendUserListContainer />
      <FriendUserListContainer />
      <FriendUserListContainer />
      <FriendUserListContainer />
      <FriendUserListContainer />
    </ul>
  )
}

export default FrinedUsersListContainer
