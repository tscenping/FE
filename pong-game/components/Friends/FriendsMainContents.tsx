import { useState, useEffect } from 'react'
import FriendTypeNaviContainer from './FriendTypeNaviContainer'
import FrinedUsersListContainer from './FriendUsersListContainer'
import BlockUsersListContainer from './BlockUsersListContainer'
import SearchUsers from './SearchUsers/SearchUsers'
import { useFriendSetPage, useGetFriends, useGetBlocks } from '@/store/friend'
import { instance } from '@/util/axios'
import CustomPagination from '../Pagination/CustomPagination'

function FriendsMainContents(): JSX.Element {
  const { tabState } = useFriendSetPage()
  const { setAllFriends, setTotalFriendCount } = useGetFriends()
  const { setAllBlocks, setTotalBlockCount } = useGetBlocks()

  const getAllFriend = async () => {
    try {
      const response = await instance({
        url: 'https://localhost:3000/users/friends/?page=1',
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
        url: 'https://localhost:3000/users/blocks/?page=1',
        method: 'get',
      })
      setAllBlocks(response.data.blocks)
      setTotalBlockCount(response.data.totalItemCount)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  useEffect(() => {
    getAllFriend()
    getAllBlock()
  }, [])

  return (
    <>
      <FriendTypeNaviContainer tabState={tabState} />
      {tabState === '1' && <FrinedUsersListContainer />}
      {tabState === '2' && <BlockUsersListContainer />}
      {tabState === '3' && <SearchUsers />}
    </>
  )
}

export default FriendsMainContents
