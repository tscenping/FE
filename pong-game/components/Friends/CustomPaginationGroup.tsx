import CustomPagination from '../Pagination/CustomPagination'
import { useFriendSetPage, useGetFriends, useGetBlocks } from '@/store/friend'

function CustomPaginationGroup(): JSX.Element {
  const { friendPage, setFriendPage, tabState } = useFriendSetPage()
  const { totalBlockCount } = useGetBlocks()
  const { totalFriendCount } = useGetFriends()

  console.log('render')
  return (
    <>
      {tabState === 'ALL' && (
        <CustomPagination
          page={friendPage}
          setPage={setFriendPage}
          itemsCountPerPage={10}
          totalItemsCount={totalFriendCount}
        />
      )}
      {tabState === 'BLOCK' && (
        <CustomPagination
          page={friendPage}
          setPage={setFriendPage}
          itemsCountPerPage={10}
          totalItemsCount={totalBlockCount}
        />
      )}
    </>
  )
}

export default CustomPaginationGroup
