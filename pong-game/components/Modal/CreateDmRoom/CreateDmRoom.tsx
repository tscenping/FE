import { useState, useEffect, useCallback } from 'react'
import styles from './CreateDmRoom.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import opponentProfileImage from '@/public/img/chat/userProfileImage.svg'
import CustomPagination from '@/components/Pagination/CustomPagination'
import UserList from './UserList'
import { instance } from '@/util/axios'
import { useGetFriends } from '@/store/friend'

interface userinfoProps {
  id: number
  nickname: string
  avatar: string
  status: string
}

function CreateDmRoom(): JSX.Element {
  const [page, setPage] = useState(1)

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
        <ModalPageTitle title="DM 생성" subTitle="대화를 나눌 유저를 선택해주세요" />
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
      <CustomPagination
        page={page}
        setPage={setPage}
        itemsCountPerPage={10}
        totalItemsCount={totalFriendCount}
      />
    </div>
  )
}

export default CreateDmRoom
