import { useState, useEffect } from 'react'
import FriendTypeNaviContainer from './FriendTypeNaviContainer'
import FrinedUsersListContainer from './FriendUsersListContainer'
import BlockUsersListContainer from './BlockUsersListContainer'
import SearchUsers from './SearchUsers/SearchUsers'
import { useFriendSetPage, useGetFriends, useGetBlocks } from '@/store/friend'
import { instance } from '@/util/axios'
import CustomPagination from '../Pagination/CustomPagination'
import styles from './FriendsMainContents.module.scss'

function FriendsMainContents(): JSX.Element {
  const { tabState, friendPage, setFriendPage } = useFriendSetPage()
  const { setAllFriends, setTotalFriendCount, totalFriendCount } = useGetFriends()
  const { setAllBlocks, setTotalBlockCount, totalBlockCount } = useGetBlocks()

  const getAllFriend = async () => {
    try {
      const response = await instance({
        url: `https://localhost:3000/users/friends/?page=${friendPage}`,
        method: 'get',
      })
      setAllFriends(response.data.friends)
      setTotalFriendCount(response.data.totalItemCount)
    } catch (error) {
      console.log('Error : ', error)
    }
  }
  const getAllBlock = async () => {
    try {
      const response = await instance({
        url: `https://localhost:3000/users/blocks/?page=${friendPage}`,
        method: 'get',
      })
      setAllBlocks(response.data.blocks)
      setTotalBlockCount(response.data.totalItemCount)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  useEffect(() => {
    console.log('render')
    if (tabState === 'ALL') getAllFriend()
    if (tabState === 'BLOCK') getAllBlock()
  }, [friendPage, tabState, totalFriendCount, totalBlockCount])

  return (
    <div className={styles.frindPageContainer}>
      <div className={styles.friendPageTop}>
        <FriendTypeNaviContainer tabState={tabState} />
        {tabState === 'ALL' && <FrinedUsersListContainer />}
        {tabState === 'BLOCK' && <BlockUsersListContainer />}
        {tabState === 'SEARCH' && <SearchUsers />}
      </div>
      {/* <CustomPaginationGroup /> */}
      {tabState === 'ALL' && totalFriendCount > 10 && (
        <CustomPagination
          page={friendPage}
          setPage={setFriendPage}
          itemsCountPerPage={10}
          totalItemsCount={totalFriendCount}
        />
      )}
      {tabState === 'BLOCK' && totalBlockCount > 10 && (
        <CustomPagination
          page={friendPage}
          setPage={setFriendPage}
          itemsCountPerPage={10}
          totalItemsCount={totalBlockCount}
        />
      )}
    </div>
  )
}

export default FriendsMainContents
