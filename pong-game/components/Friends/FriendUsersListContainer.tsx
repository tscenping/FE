import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import CustomPagination from '../pagination/CustomPagination'
import { useState } from 'react'

function FrinedUsersListContainer(): JSX.Element {
  const [page, setPage] = useState(1)
  return (
    <>
      <ul className={styles.frinedUsersListContainer}>
        <FriendUserListContainer />
        <FriendUserListContainer />
        <FriendUserListContainer />
        <FriendUserListContainer />
        <FriendUserListContainer />
      </ul>
      <CustomPagination page={page} setPage={setPage} itemsCountPerPage={10} totalItemsCount={20} />
    </>
  )
}

export default FrinedUsersListContainer
