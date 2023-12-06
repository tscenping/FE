import { useState, useEffect } from 'react'
import styles from './FriendUsersModal.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import CustomPagination from '@/components/Pagination/CustomPagination'
import UserList from './UserList'
import { instance } from '@/util/axios'
import { useGetFriends } from '@/store/friend'
import { useModalState } from '@/store/store'

interface userinfoProps {
  id: number
  nickname: string
  avatar: string
  status: string
}

function FriendUsersModal(): JSX.Element {
  const [page, setPage] = useState(1)
  const { modalProps } = useModalState()

  const { allFriends, setAllFriends, totalFriendCount } = useGetFriends()
  const getAllFriendHandler = async () => {
    try {
      const response = await instance({
        url: `https://localhost:3000/users/friends/?page=${page}`,
        method: 'get',
      })
      setAllFriends(response.data.friends)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  useEffect(() => {
    getAllFriendHandler()
  }, [page])

  return (
    <div className={styles.createDmRoomContent}>
      <div>
        {modalProps.modalType === 'DM' && (
          <ModalPageTitle title="DM 생성" subTitle="대화를 나눌 유저를 선택해주세요" />
        )}
        {modalProps.modalType === 'INVITE' && (
          <ModalPageTitle title="친구 초대" subTitle="대화를 나눌 유저를 선택해주세요" />
        )}
        <ul className={styles.usersContainer}>
          {allFriends &&
            allFriends.map((friend) => (
              <UserList
                key={friend.id}
                id={friend.id}
                nickname={friend.nickname}
                avatar={friend.avatar}
                status={friend.status}
              />
            ))}
        </ul>
      </div>
      {totalFriendCount > 10 && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={totalFriendCount}
        />
      )}
    </div>
  )
}

export default FriendUsersModal
