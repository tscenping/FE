import { useEffect } from 'react'
import FriendTypeNaviContainer from './FriendTypeNaviContainer'
import FrinedUsersListContainer from './FriendUsersListContainer'
import BlockUsersListContainer from './BlockUsersListContainer'
import SearchUsers from './SearchUsers/SearchUsers'
import { useFriendSetPage, useGetFriends, useGetBlocks, useGetUser } from '@/store/friend'
import { instance } from '@/util/axios'
import CustomPagination from '../Pagination/CustomPagination'
import styles from './FriendsMainContents.module.scss'

function FriendsMainContents(): JSX.Element {
  const { tabState, friendPage, setFriendPage } = useFriendSetPage()
  const { setAllFriends, setTotalFriendCount, totalFriendCount } = useGetFriends()
  const { setAllBlocks, setTotalBlockCount, totalBlockCount } = useGetBlocks()
  const { setUser } = useGetUser()

  const getAllFriend = async () => {
    try {
      const response = await instance(`/users/friends/?page=${friendPage}`, {
        method: 'get',
      })
      setAllFriends(response.data.friends)
      setTotalFriendCount(response.data.totalItemCount)
      setUser(null)
    } catch (error) {
      console.log('Error : ', error)
    }
  }
  const getAllBlock = async () => {
    try {
      const response = await instance(`/users/blocks/?page=${friendPage}`, {
        method: 'get',
      })
      setAllBlocks(response.data.blocks)
      setTotalBlockCount(response.data.totalItemCount)
      setUser(null)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  useEffect(() => {
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
