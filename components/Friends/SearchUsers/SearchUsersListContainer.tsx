import styles from './SearchUsersListContainer.module.scss'
import SearchUserListContainer from './SearchUserListContainer'
import { useGetUser } from '@/store/friend'

function SearchUsersListContainer(): JSX.Element {
  const { user } = useGetUser()

  return (
    <>
      {user ? (
        <ul className={styles.searchUsersListContainer}>
          {user && (
            <SearchUserListContainer
              nickname={user.nickname}
              avatar={user.avatar}
              id={user.id}
              isFriend={user.isFriend}
              isBlocked={user.isBlocked}
            />
          )}
        </ul>
      ) : (
        <p className={styles.noSearchUsers}>새로운 유저를 검색해보세요.</p>
      )}
    </>
  )
}

export default SearchUsersListContainer
