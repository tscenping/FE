import { useJoinChannel } from '@/store/chat'
import { useModalState, useResponseModalState } from '@/store/store'
import { instance } from '@/util/axios'
interface EditBlockProps {
  isBlocked: boolean
  friendId: number
  nickname: string
  setIsDropDownView: (v: boolean) => void
}
export default function EditBlock(props: EditBlockProps) {
  const { channelUserInfo, setChannelUserInfo } = useJoinChannel()
  const responseModal = useResponseModalState()
  const { setModalName } = useModalState()
  const changeArrayItem = (newType, idToChange) => {
    const result = channelUserInfo.map((item) => {
      if (item.nickname === idToChange) {
        return {
          ...item,
          isBlocked: newType,
        }
      } else {
        return {
          ...item,
        }
      }
    })
    setChannelUserInfo(result)
  }
  const blockHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    props.setIsDropDownView(false)
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
          changeArrayItem(true, props.nickname)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  const unBlockHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    props.setIsDropDownView(false)
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
          changeArrayItem(false, props.nickname)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  const setBlockModal = () => {
    setModalName('response')
    props.isBlocked ? responseModal.setResponseModalState(
      '유저 차단',
      `${props.nickname}님을 차단 해제 하시겠습니까?`,
      unBlockHandler,
    ) : responseModal.setResponseModalState(
      '유저 차단',
      `${props.nickname}님을 차단 하시겠습니까?`,
      blockHandler,
    )
  }

  return (
    <li>
      {props.isBlocked ? (
        <button onClick={setBlockModal}>차단해제</button>
      ) : (
        <button onClick={setBlockModal}>차단하기</button>
      )}
    </li>
  )
}
