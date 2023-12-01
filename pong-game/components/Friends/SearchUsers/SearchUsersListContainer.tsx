import { useState } from 'react'
import styles from './SearchUsersListContainer.module.scss'
import FriendUserListContainer from '../FriendUserListContainer'
import CustomPagination from '@/components/Pagination/CustomPagination'
import SearchUserListContainer from './SearchUserListContainer'

function SearchUsersListContainer(): JSX.Element {
  const [page, setPage] = useState(1)
  return (
    <>
      <ul className={styles.searchUsersListContainer}>
        <SearchUserListContainer nickname={'sangyeki'} />
        <SearchUserListContainer nickname={'him'} />
        <SearchUserListContainer nickname={'jiyun'} />
        <SearchUserListContainer nickname={'yubchoi'} />
        <SearchUserListContainer nickname={'jang-cho'} />
      </ul>
      {/* <CustomPagination page={page} setPage={setPage} itemsCountPerPage={5} totalItemsCount={50} /> */}
    </>
  )
}

export default SearchUsersListContainer
