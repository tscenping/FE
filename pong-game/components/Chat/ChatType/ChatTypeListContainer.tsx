import { useEffect } from 'react'
import styles from './ChatTypeListContainer.module.scss'
import ChatDmRoomListSection from './ChatDmRoomListSection'
import ChatRoomListSection from './ChatRoomListSection'
import { useNavBarState } from '@/store/chat'
import EnteredRoomListSection from './EnteredRoomListSection'
import { instance } from '@/util/axios'
import { useGetChannels } from '@/store/chat'
import CustomPagination from '@/components/Pagination/CustomPagination'

function ChatTypeListContainer(): JSX.Element {
  const { tabState } = useNavBarState()
  const {
    setAllChannels,
    setTotalAll,
    setMeChannels,
    setDmChannels,
    setTotalDm,
    setTotalMe,
    page,
  } = useGetChannels()
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
  //"tabState의 변화에 따라서 api요청 보내도록 구현"
  //"ChatRoomListTab.tsx"의 "span"요소에서 할 경우 재 렌더링 문제가 발생해서 위치 변경
  useEffect(() => {
    if (tabState === '1') getAllChannels()
    if (tabState === '2') getMeChannels()
    if (tabState === '3') getDmChannels()
  }, [tabState, page])

  return (
    <>
      <div className={styles.chatTypeListContainer}>
        {tabState === '1' && <ChatRoomListSection />}
        {tabState === '2' && <EnteredRoomListSection />}
        {tabState === '3' && <ChatDmRoomListSection />}
      </div>
      {/* {tabState === '1' && (
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
      )} */}
    </>
  )
}

export default ChatTypeListContainer
