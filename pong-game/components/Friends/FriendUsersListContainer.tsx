import { useState } from 'react'
import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import CustomPagination from '../Pagination/CustomPagination'
import { useGetFriends, useFriendSetPage } from '@/store/friend'

function FrinedUsersListContainer(): JSX.Element {
  const { friendPage, setFriendPage } = useFriendSetPage()
  const { allFriends, totalFriendCount } = useGetFriends()

  return (
    <>
      <ul className={styles.frinedUsersListContainer}>
        {allFriends.map((friend) => (
          <FriendUserListContainer
            nickname={friend.nickname}
            avatar={friend.avatar}
            id={friend.id}
            status={friend.status}
            isFriend={true}
            isBlocked={false}
          />
        ))}
        {/* <FriendUserListContainer nickname={'sangyeki'} />
        <FriendUserListContainer nickname={'him'} />
        <FriendUserListContainer nickname={'jiyun'} />
        <FriendUserListContainer nickname={'yubchoi'} />
        <FriendUserListContainer nickname={'jang-cho'} />
        <FriendUserListContainer nickname={'sangyeki'} />
        <FriendUserListContainer nickname={'him'} />
        <FriendUserListContainer nickname={'jiyun'} />
        <FriendUserListContainer nickname={'yubchoi'} />
        <FriendUserListContainer nickname={'jang-cho'} /> */}
      </ul>
      <CustomPagination
        page={friendPage}
        setPage={setFriendPage}
        itemsCountPerPage={10}
        totalItemsCount={totalFriendCount}
      />
    </>
  )
}

export default FrinedUsersListContainer
