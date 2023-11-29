import { useState } from 'react'
import styles from './ChatRoomList.module.scss'
import ChatListNavBarContainer from './ChatInfoLog/ChatListNavBarContainer'
import ChatTypeListContainer from './ChatType/ChatTypeListContainer'
import CustomPagination from '../Pagination/CustomPagination'
import { useNavBarState } from '@/store/chat'
import { useGetChannels } from '@/store/chat'

function ChatRoomList(): JSX.Element {
  const [page, setPage] = useState(1)
  const { tabState } = useNavBarState()
  const { totalAll } = useGetChannels()

  console.log(totalAll)
  return (
    <div className={styles.chatListNavBar}>
      <div className={styles.chatListTop}>
        <ChatListNavBarContainer />
        <ChatTypeListContainer />
      </div>
      <div>
        {tabState === '1' && (
          <CustomPagination
            page={page}
            setPage={setPage}
            itemsCountPerPage={10}
            totalItemsCount={0}
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
        )}
      </div>
      {/* page선택 섹션*/}
    </div>
  )
}

export default ChatRoomList
