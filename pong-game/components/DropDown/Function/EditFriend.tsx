import { useJoinChannel } from '@/store/chat'
import { useModalState, useResponseModalState } from '@/store/store'
import { instance } from '@/util/axios'

interface EditFriendProps {
  isFriend: boolean
  friendId: number
  nickname: string
  setIsDropDownView: (v: boolean) => void
}
export default function EditFriend(props: EditFriendProps) {
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()
  const { channelUserInfo, setChannelUserInfo } = useJoinChannel()
  console.log(props)
  const changeArrayItem = (newType, idToChange) => {
    const result = channelUserInfo.map((item) => {
      if (item.nickname === idToChange) {
        return {
          ...item,
          isFriend: newType,
        }
      } else {
        return {
          ...item,
        }
      }
    })
    setChannelUserInfo(result)
  }
  // function changeArrayItem(newType, idToChange) {
  //   const itemToChange = channelUserInfo.find((item) => item.nickname === idToChange)
  //   if (itemToChange) {
  //     itemToChange.channelUserType = newType
  //   }
  //   const resData = channelUserInfo.filter(({ nickname }) => nickname != idToChange)
  //   console.log(resData)
  //   resData.push(itemToChange)
  //   setChannelUserInfo(resData)
  // }

  const addFriendHandler = async () => {
    props.setIsDropDownView(false)
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
          changeArrayItem(true, props.nickname)
          console.log(channelUserInfo)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  const deleteFriendHandler = async () => {
    props.setIsDropDownView(false)
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
          changeArrayItem(false, props.nickname)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  const setFriendkModal = () => {
    setModalName('response')
    props.isFriend ? responseModal.setResponseModalState(
      '친구 삭제',
      `${props.nickname}님을 친구삭제 하시겠습니까?`,
      deleteFriendHandler,
    ) : responseModal.setResponseModalState(
      '친구 추가',
      `${props.nickname}님을 친구추가 하시겠습니까?`,
      addFriendHandler,
    )
  }

  return (
    <li>
      {props.isFriend ? (
        <button onClick={setFriendkModal}>친구삭제</button>
      ) : (
        <button onClick={setFriendkModal}>친구추가</button>
      )}
    </li>
  )
}
