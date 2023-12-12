import { useEffect } from 'react'
import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import { useGetFriends } from '@/store/friend'
import { socket } from '@/socket/socket'

interface msgProps {
  status: string
  userId: number
}

function FrinedUsersListContainer(): JSX.Element {
  const { allFriends, setAllFriends } = useGetFriends()

  useEffect(() => {
    if (socket.connected) {
      const handleUserStatus = (msg: msgProps) => {
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
      {allFriends.length > 0 ? (
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
      ) : (
        <p className={styles.noFriends}>새로운 친구를 만들어보세요.</p>
      )}
    </>
  )
}

export default FrinedUsersListContainer
