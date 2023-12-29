import styles from './BlockUsersListContainer.module.scss'
import FriendUserListContainer from './FriendUserListContainer'
import { useGetBlocks } from '@/store/friend'

function BlockUsersListContainer(): JSX.Element {
  const { allBlocks } = useGetBlocks()

  return (
    <>
      {allBlocks.length > 0 ? (
        <ul className={styles.frinedUsersListContainer}>
          {allBlocks.map((block) => (
            <FriendUserListContainer
              key={block.id}
              id={block.id}
              nickname={block.nickname}
              avatar={block.avatar}
              status={block.status}
              isFriend={false}
              isBlocked={true}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.noBlocks}>차단된 유저가 없습니다.</p>
      )}
    </>
  )
}

export default BlockUsersListContainer
