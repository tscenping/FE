import { instance } from '@/util/axios'

interface EditFriendProps {
  isFriend: boolean
  friendId: number
}
export default function EditFriend(props: EditFriendProps) {
  console.log(props.isFriend)
  const addFriendHandler = async () => {
    try {
      await instance
        .post(
          `/users/friends`,
          {
            friendId: props.friendId,
          },
          { withCredentials: true },
        )
        .then(function (res) {
          console.log(res)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  const deleteFriendHandler = async () => {
    try {
      await instance
        .delete(`/users/friends`, {
          data: {
            friendId: props.friendId,
          },
          withCredentials: true,
        })
        .then(function (res) {
          console.log(res)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <li>
      {props.isFriend ? (
        <button onClick={deleteFriendHandler}>친구삭제</button>
      ) : (
        <button onClick={addFriendHandler}>친구추가</button>
      )}
    </li>
  )
}
