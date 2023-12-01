import styles from './SearchUsersListContainer.module.scss'
import CustomPagination from '@/components/Pagination/CustomPagination'
import SearchUserListContainer from './SearchUserListContainer'
import { useGetUser } from '@/store/friend'

function SearchUsersListContainer(): JSX.Element {
  const { user } = useGetUser()
  return (
    <>
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
      {/* <CustomPagination page={page} setPage={setPage} itemsCountPerPage={5} totalItemsCount={50} /> */}
    </>
  )
}

export default SearchUsersListContainer
