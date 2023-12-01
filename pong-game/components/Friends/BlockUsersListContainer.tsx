import { useState } from 'react'
import styles from './BlockUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import CustomPagination from '../Pagination/CustomPagination'
import { useFriendSetPage, useGetBlocks } from '@/store/friend'
function BlockUsersListContainer(): JSX.Element {
  const { friendPage, setFriendPage } = useFriendSetPage()
  const { allBlocks, totalBlockCount } = useGetBlocks()
  return (
    <>
      <ul className={styles.frinedUsersListContainer}>
        {allBlocks.map((block) => (
          <FriendUserListContainer
            id={block.id}
            nickname={block.nickname}
            avatar={block.avatar}
            status={block.status}
            isFriend={false}
            isBlocked={true}
          />
        ))}
        {/* <FriendUserListContainer nickname={'sangyeki'} />
        <FriendUserListContainer nickname={'him'} />
        <FriendUserListContainer nickname={'jiyun'} />
        <FriendUserListContainer nickname={'yubchoi'} />
        <FriendUserListContainer nickname={'jang-cho'} /> */}
      </ul>
      <CustomPagination
        page={friendPage}
        setPage={setFriendPage}
        itemsCountPerPage={10}
        totalItemsCount={totalBlockCount}
      />
    </>
  )
}

export default BlockUsersListContainer
