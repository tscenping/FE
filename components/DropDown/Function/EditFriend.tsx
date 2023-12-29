import { useJoinChannel } from '@/store/chat'
import { useModalState, useResponseModalState } from '@/store/store'
import { instance } from '@/util/axios'
import { useGetFriends, useGetUser } from '@/store/friend'
import { useErrorCheck } from '@/store/login'

interface EditFriendProps {
  isFriend: boolean
  friendId: number
  nickname: string
  calledFrom?: 'searchUserList'
  setIsDropDownView: (v: boolean) => void
}

export default function EditFriend(props: EditFriendProps) {
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()
  const { channelUserInfo, setChannelUserInfo } = useJoinChannel()
  const { setTotalFriendCount, totalFriendCount } = useGetFriends()
  const { user, setUser } = useGetUser()
  const { setApiError } = useErrorCheck()

  const changeItem = (newType) => {
    const result = user
    if (newType) {
      result.isBlocked = false
    }
    result.isFriend = newType
    setUser(result)
  }

  const changeArrayItem = (newType, idToChange) => {
    if (!channelUserInfo) {
      //채널에서 나가기 할 경우 "channelUserInfo === null" 이 경우를 피할 분기문
      return
    } else {
      const result = channelUserInfo.map((item) => {
        if (item.nickname === idToChange) {
          if (newType) {
            return {
              ...item,
              isFriend: newType,
              isBlocked: false,
            }
          }
          return {
            ...item,
            isFriend: newType,
            isBlocked: false,
          }
        } else {
          return {
            ...item,
          }
        }
      })
      setChannelUserInfo(result)
    }
  }

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
          setTotalFriendCount(totalFriendCount + 1)
          if (props.calledFrom === 'searchUserList') {
            changeItem(true)
          }
          changeArrayItem(true, props.nickname)
        })
    } catch (e) {
      if (e && e.response.status === 401) setApiError(401)
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
          setTotalFriendCount(totalFriendCount - 1)
          if (props.calledFrom === 'searchUserList') {
            changeItem(false)
          }
          changeArrayItem(false, props.nickname)
        })
    } catch (e) {
      if (e && e.response.status === 401) setApiError(401)
      console.log(e.message)
    }
  }

  const setFriendkModal = () => {
    setModalName('response')
    props.setIsDropDownView(false)
    props.isFriend
      ? responseModal.setResponseModalState(
          '친구 삭제',
          `"${props.nickname}" 님을 친구삭제 하시겠습니까?`,
          deleteFriendHandler,
        )
      : responseModal.setResponseModalState(
          '친구 추가',
          `"${props.nickname}" 님을 친구추가 하시겠습니까?`,
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
