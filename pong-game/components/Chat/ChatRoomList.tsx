import { useState } from 'react'
import styles from './ChatRoomList.module.scss'
import ChatListNavBarContainer from './ChatInfoLog/ChatListNavBarContainer'
import ChatTypeListContainer from './ChatType/ChatTypeListContainer'
import CustomPagination from '../Pagination/CustomPagination'

function ChatRoomList(): JSX.Element {
  const [page, setPage] = useState(1)
  return (
    <div className={styles.chatListNavBar}>
      <div className={styles.chatListTop}>
        <ChatListNavBarContainer />
        <ChatTypeListContainer />
      </div>
      <div>
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={30}
        />
      </div>
      {/* page선택 섹션*/}
    </div>
  )
}

export default ChatRoomList
