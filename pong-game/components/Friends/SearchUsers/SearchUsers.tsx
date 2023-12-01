import { useRef } from 'react'
import styles from './SearchUsers.module.scss'
import FrinedUsersListContainer from '../FriendUsersListContainer'
import SearchInputContainer from './SearchInputContainer'
import SearchUsersListContainer from './SearchUsersListContainer'

function SearchUsers(): JSX.Element {
  const inputRef = useRef()

  return (
    <div className={styles.searchUsers}>
      <form className={styles.searchInputContainer}>
        <SearchInputContainer inputRef={inputRef} />
      </form>
      <div className={styles.findUserList}>
        {/* <FrinedUsersListContainer /> */}
        <SearchUsersListContainer />
      </div>
    </div>
  )
}

export default SearchUsers
