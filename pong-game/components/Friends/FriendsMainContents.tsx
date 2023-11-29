import { useState } from 'react'
import FriendTypeNaviContainer from './FriendTypeNaviContainer'
import FrinedUsersListContainer from './FriendUsersListContainer'
import BlockUsersListContainer from './BlockUsersListContainer'
import SearchUsers from './SearchUsers/SearchUsers'
import CustomPagination from '../Pagination/CustomPagination'

function FriendsMainContents(): JSX.Element {
  const [tabState, setTabState] = useState('1')
  const [page, setPage] = useState(1)
  return (
    <>
      <FriendTypeNaviContainer tabState={tabState} setTabState={setTabState} />
      {tabState === '1' && <FrinedUsersListContainer />}
      {tabState === '2' && <BlockUsersListContainer />}
      {tabState === '3' && <SearchUsers />}
    </>
  )
}

export default FriendsMainContents
