import { useEffect } from 'react'
import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import { useGetFriends } from '@/store/friend'
import { socket } from '@/socket/socket'

function FrinedUsersListContainer(): JSX.Element {
  const { allFriends, setAllFriends } = useGetFriends()

  useEffect(() => {
    if (socket.connected) {
      const handleUserStatus = (msg) => {
        // 이벤트 핸들러 내에서의 로직은 그대로 유지
        const updatedFriends = allFriends.map((friend) => {
          if (friend.id === msg.userId) {
            return {
              ...friend,
              status: msg.status,
            }
          }
          return friend
        })
        setAllFriends(updatedFriends)
      }

      socket.on('userStatus', handleUserStatus)

      // 컴포넌트 언마운트 시 정리 작업
      return () => {
        socket.off('userStatus', handleUserStatus)
      }
    }
  }, [allFriends, socket])

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
