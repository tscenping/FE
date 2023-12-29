import { useEffect, useCallback } from 'react'
import styles from './ChatRoomList.module.scss'
import ChatListNavBarContainer from './ChatInfoLog/ChatListNavBarContainer'
import ChatTypeListContainer from './ChatType/ChatTypeListContainer'
import { instance } from '@/util/axios'
import { useGetChannels } from '@/store/chat'
import CustomPagination from '../Pagination/CustomPagination'
import { useNavBarState } from '@/store/chat'
import { useErrorCheck } from '@/store/login'

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
  const { setApiError } = useErrorCheck()

  const getAllChannels = useCallback(async () => {
    try {
      const response = await instance(`channels/all/?page=1`, {
        method: 'get',
      })
      setAllChannels(response.data.channels)
      setTotalAll(response.data.totalDataSize)
    } catch (error) {
      if (error && error.response.status === 401) setApiError(401)
      console.log('Error : ', error)
    }
  }, [setAllChannels, setTotalAll, setApiError])

  const getMeChannels = useCallback(async () => {
    try {
      const response = await instance(`channels/me/?page=1`, {
        method: 'get',
      })
      setMeChannels(response.data.channels)
      setTotalMe(response.data.totalDataSize)
    } catch (error) {
      if (error && error.response.status === 401) setApiError(401)
      console.log('Error : ', error)
    }
  }, [setMeChannels, setTotalMe, setApiError])

  const getDmChannels = useCallback(async () => {
    try {
      const response = await instance(`/channels/dm/?page=1`, {
        method: 'get',
      })
      setDmChannels(response.data.dmChannels)
      setTotalDm(response.data.totalItemCount)
    } catch (error) {
      if (error && error.response.status === 401) setApiError(401)
      console.log('Error : ', error)
    }
  }, [setDmChannels, setTotalDm, setApiError])

  useEffect(() => {
    getAllChannels()
    getMeChannels()
    getDmChannels()
  }, [getAllChannels, getDmChannels, getMeChannels])

  return (
    <div className={styles.chatListNavBar}>
      <div>
        <ChatListNavBarContainer />
        <ChatTypeListContainer />
      </div>
      {tabState === 'ENTIRE' && totalAll > 10 && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={totalAll || 0}
        />
      )}
      {tabState === 'JOINED' && totalMe > 10 && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={totalMe || 0}
        />
      )}
      {tabState === 'DM' && totalDm > 10 && (
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
