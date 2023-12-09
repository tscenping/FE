import { useEffect } from 'react'
import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import { useGetFriends } from '@/store/friend'
import { socket } from '@/socket/socket'

function FrinedUsersListContainer(): JSX.Element {
  const { allFriends, setAllFriends } = useGetFriends()

  useEffect(() => {
    if (socket.connected) {
      socket.on('userStatus', (msg) => {
        // allFriends 배열에서 id가 일치하는 객체를 찾는다.
        const updatedFriends = allFriends.map((friend) => {
          if (friend.id === msg.userId) {
            // socket으로 온 id와 일치한 id를 찾았다면 해당 status를 바꿔준다.
            return {
              ...friend,
              status: msg.status, // 새로운 상태 정보로 업데이트
            }
          }
          return friend
        })
        setAllFriends(updatedFriends)
      })
    }
  }, [allFriends])

  return (
    <>
      <ul className={styles.frinedUsersListContainer}>
        {allFriends.map((friend) => (
          <FriendUserListContainer
            key={friend.id}
            nickname={friend.nickname}
            avatar={friend.avatar}
            id={friend.id}
            status={friend.status}
            isFriend={true}
            isBlocked={false}
          />
        ))}
      </ul>
    </>
  )
}

export default FrinedUsersListContainer
