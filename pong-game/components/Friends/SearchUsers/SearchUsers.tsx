import styles from './SearchUsers.module.scss'
import FrinedUsersListContainer from '../FriendUsersListContainer'
import SearchInputContainer from './SearchInputContainer'

function SearchUsers(): JSX.Element {
  return (
    <div className={styles.searchUsers}>
      <SearchInputContainer />
      <div className={styles.findUserList}>
        <FrinedUsersListContainer />
      </div>
    </div>
  )
}

export default SearchUsers
