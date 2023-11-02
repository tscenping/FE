import { useState } from 'react'
import FriendTypeNaviContainer from './FriendTypeNaviContainer'
import FrinedUsersListContainer from './FriendUsersListContainer'
import SearchUsers from './SearchUsers/SearchUsers'

function FriendsMainContents(): JSX.Element {
  const [tabState, setTabState] = useState('1')
  return (
    <>
      <FriendTypeNaviContainer tabState={tabState} setTabState={setTabState} />
      {tabState === '1' && <FrinedUsersListContainer />}
      {tabState === '2' && <FrinedUsersListContainer />}
      {tabState === '3' && <SearchUsers />}
    </>
  )
}

export default FriendsMainContents
