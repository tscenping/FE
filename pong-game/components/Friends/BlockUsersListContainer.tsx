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
            key={block.id}
            id={block.id}
            nickname={block.nickname}
            avatar={block.avatar}
            status={block.status}
            isFriend={false}
            isBlocked={true}
          />
        ))}
      </ul>
      {/* <CustomPagination
        page={friendPage}
        setPage={setFriendPage}
        itemsCountPerPage={10}
        totalItemsCount={totalBlockCount}
      /> */}
    </>
  )
}

export default BlockUsersListContainer
