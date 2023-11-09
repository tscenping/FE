import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import CustomPagination from '../pagination/CustomPagination'

function FrinedUsersListContainer(): JSX.Element {
  return (
    <>
    <ul className={styles.frinedUsersListContainer}>
      <FriendUserListContainer />
      <FriendUserListContainer />
      <FriendUserListContainer />
      <FriendUserListContainer />
      <FriendUserListContainer />
    </ul>
    <CustomPagination itemsCountPerPage={10} totalItemsCount={20} />
    </>
  )
}

export default FrinedUsersListContainer
