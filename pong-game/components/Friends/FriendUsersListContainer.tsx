import styles from './FriendUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import { useGetFriends } from '@/store/friend'

function FrinedUsersListContainer(): JSX.Element {
  const { allFriends } = useGetFriends()

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
