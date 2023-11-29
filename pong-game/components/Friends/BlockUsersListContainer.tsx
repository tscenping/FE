import { useState } from 'react'
import styles from './BlockUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import CustomPagination from '../Pagination/CustomPagination'

function BlockUsersListContainer(): JSX.Element {
  const [page, setPage] = useState(1)
  return (
    <>
      <ul className={styles.frinedUsersListContainer}>
        <FriendUserListContainer nickname={'sangyeki'} />
        <FriendUserListContainer nickname={'him'} />
        <FriendUserListContainer nickname={'jiyun'} />
        <FriendUserListContainer nickname={'yubchoi'} />
        <FriendUserListContainer nickname={'jang-cho'} />
      </ul>
      <CustomPagination page={page} setPage={setPage} itemsCountPerPage={10} totalItemsCount={20} />
    </>
  )
}

export default BlockUsersListContainer
