import { useEffect } from 'react'
import styles from './ChatTypeListContainer.module.scss'
import ChatDmRoomListSection from './ChatDmRoomListSection'
import ChatRoomListSection from './ChatRoomListSection'
import { useNavBarState } from '@/store/chat'
import EnteredRoomListSection from './EnteredRoomListSection'
// import CustomPagination from '@/components/Pagination/CustomPagination'
import { instance } from '@/util/axios'

function ChatTypeListContainer(): JSX.Element {
  // const [page, setPage] = useState(1)
  const { tabState } = useNavBarState()

  //"tabState의 변화에 따라서 api요청 보내도록 구현"
  //"ChatRoomListTab.tsx"의 "span"요소에서 할 경우 재 렌더링 문제가 발생해서 위치 변경
  useEffect(() => {
    console.log(tabState)
    const apiRequest = async () => {
      if (tabState === '1') {
        const response = await instance({
          url: 'https://localhost:3000/channels/all/?page=1',
          method: 'get',
        })
        console.log(response)
      }
      if (tabState === '2') {
        const response = await instance({
          url: 'https://localhost:3000/channels/me/?page=1',
          method: 'get',
        })
        console.log(response)
      }
      if (tabState === '3') {
        const response = await instance({
          url: 'https://localhost:3000/channels/dm/?page=1',
          method: 'get',
        })
        console.log(response)
      }
    }
    apiRequest()
  }, [tabState])
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
          totalItemsCount={30}
        />
      )}
      {tabState === '2' && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={40}
        />
      )}
      {tabState === '3' && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={50}
        />
      )} */}
    </>
  )
}

export default ChatTypeListContainer
