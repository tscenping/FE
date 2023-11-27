// import { useState } from 'react'
import styles from './ChatTypeListContainer.module.scss'
import ChatDmRoomListSection from './ChatDmRoomListSection'
import ChatRoomListSection from './ChatRoomListSection'
import { useNavBarState } from '@/store/chat'
import EnteredRoomListSection from './EnteredRoomListSection'
// import CustomPagination from '@/components/Pagination/CustomPagination'

function ChatTypeListContainer(): JSX.Element {
  // const [page, setPage] = useState(1)
  const { tabState } = useNavBarState()
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
