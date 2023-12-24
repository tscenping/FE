import { useEffect, useCallback } from 'react'
import styles from './ChatTypeListContainer.module.scss'
import ChatDmRoomListSection from './ChatDmRoomListSection'
import ChatRoomListSection from './ChatRoomListSection'
import { useNavBarState } from '@/store/chat'
import EnteredRoomListSection from './EnteredRoomListSection'
import { instance } from '@/util/axios'
import { useGetChannels } from '@/store/chat'

function ChatTypeListContainer(): JSX.Element {
  const { tabState } = useNavBarState()
  const {
    setAllChannels,
    setTotalAll,
    setMeChannels,
    setDmChannels,
    setTotalDm,
    setTotalMe,
    totalDm,
    page,
  } = useGetChannels()

  const getAllChannels = useCallback(async () => {
    try {
      const response = await instance(`/channels/all/?page=${page}`, {
        method: 'get',
      })
      setAllChannels(response.data.channels)
      setTotalAll(response.data.totalDataSize)
    } catch (error) {
      console.log('Error : ', error)
    }
  }, [page, setAllChannels, setTotalAll])

  const getMeChannels = useCallback(async () => {
    try {
      const response = await instance(`/channels/me/?page=${page}`, {
        method: 'get',
      })
      setMeChannels(response.data.channels)
      setTotalMe(response.data.totalDataSize)
    } catch (error) {
      console.log('Error : ', error)
    }
  }, [page, setMeChannels, setTotalMe])

  const getDmChannels = useCallback(async () => {
    try {
      const response = await instance(`/channels/dm/?page=${page}`, {
        method: 'get',
      })
      setDmChannels(response.data.dmChannels)
      setTotalDm(response.data.totalItemCount)
    } catch (error) {
      console.log('Error : ', error)
    }
  }, [page, setDmChannels, setTotalDm])

  //"tabState의 변화에 따라서 api요청 보내도록 구현"
  //"ChatRoomListTab.tsx"의 "span"요소에서 할 경우 재 렌더링 문제가 발생해서 위치 변경
  useEffect(() => {
    if (tabState === 'ENTIRE') getAllChannels()
    if (tabState === 'JOINED') getMeChannels()
    if (tabState === 'DM') getDmChannels()
  }, [tabState, page, totalDm, getAllChannels, getDmChannels, getMeChannels])

  return (
    <>
      <div className={styles.chatTypeListContainer}>
        {tabState === 'ENTIRE' && <ChatRoomListSection />}
        {tabState === 'JOINED' && <EnteredRoomListSection />}
        {tabState === 'DM' && <ChatDmRoomListSection />}
      </div>
    </>
  )
}

export default ChatTypeListContainer
