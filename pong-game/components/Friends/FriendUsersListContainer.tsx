import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import CustomPagination from '../Pagination/CustomPagination'
import { useState } from 'react'

function FrinedUsersListContainer(): JSX.Element {
  const [page, setPage] = useState(1)
  return (
    <>
      <ul className={styles.frinedUsersListContainer}>
        <FriendUserListContainer nickname={'sangyeki'} />
        <FriendUserListContainer nickname={'him'} />
        <FriendUserListContainer nickname={'jiyun'} />
        <FriendUserListContainer nickname={'yubchoi'} />
        <FriendUserListContainer nickname={'jang-cho'} />
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

export default FrinedUsersListContainer
