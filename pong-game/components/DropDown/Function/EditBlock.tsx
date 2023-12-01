import { instance } from '@/util/axios'
interface EditBlockProps {
  isBlocked: boolean
  friendId: number
}
export default function EditBlock(props: EditBlockProps) {
  const blockHandler = async () => {
    try {
      await instance
        .post(
          `/users/blocks`,
          {
            blockId: props.friendId,
            // blockId: 3,
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

  const unBlockHandler = async () => {
    try {
      await instance
        .delete(`/users/blocks`, {
          data: {
            blockId: props.friendId,
            // blockId: 3,
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
      {props.isBlocked ? (
        <button onClick={unBlockHandler}>차단해제</button>
      ) : (
        <button onClick={blockHandler}>차단하기</button>
      )}
    </li>
  )
}
