import { useState, useEffect } from 'react'
import styles from './ChatRoomList.module.scss'
import ChatListNavBarContainer from './ChatInfoLog/ChatListNavBarContainer'
import ChatTypeListContainer from './ChatType/ChatTypeListContainer'
import { instance } from '@/util/axios'
import { useGetChannels } from '@/store/chat'
import CustomPagination from '../Pagination/CustomPagination'
import { useNavBarState } from '@/store/chat'
function ChatRoomList(): JSX.Element {
  const {
    setAllChannels,
    setMeChannels,
    setDmChannels,
    setTotalAll,
    setTotalMe,
    setTotalDm,
    page,
    setPage,
    totalAll,
    totalDm,
    totalMe,
  } = useGetChannels()
  const { tabState } = useNavBarState()

  const getAllChannels = async () => {
    try {
      const response = await instance({
        url: `https://localhost:3000/channels/all/?page=${page}`,
        method: 'get',
      })
      setAllChannels(response.data.channels)
      setTotalAll(response.data.totalDataSize)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const getMeChannels = async () => {
    try {
      const response = await instance({
        url: `https://localhost:3000/channels/me/?page=${page}`,
        method: 'get',
      })
      setMeChannels(response.data.channels)
      setTotalMe(response.data.totalDataSize)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const getDmChannels = async () => {
    try {
      const response = await instance({
        url: `https://localhost:3000/channels/dm/?page=${page}`,
        method: 'get',
      })
      setDmChannels(response.data.dmChannels)
      setTotalDm(response.data.totalItemCount)
    } catch (error) {
      console.log('Error : ', error)
    }
  }
  useEffect(() => {
    getAllChannels()
    getMeChannels()
    getDmChannels()
  }, [])

  return (
    <div className={styles.chatListNavBar}>
      <div>
        <ChatListNavBarContainer />
        <ChatTypeListContainer />
      </div>
      {tabState === '1' && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={totalAll || 0}
        />
      )}
      {tabState === '2' && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={totalMe || 0}
        />
      )}
      {tabState === '3' && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={totalDm || 0}
        />
      )}
    </div>
  )
}

export default ChatRoomList
