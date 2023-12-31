import { useJoinChannel } from '@/store/chat'
import { useGetUser } from '@/store/friend'
import { useModalState, useResponseModalState } from '@/store/store'
import { instance } from '@/util/axios'
import { useGetBlocks } from '@/store/friend'
import { useErrorCheck } from '@/store/login'

interface EditBlockProps {
  isBlocked: boolean
  friendId: number
  nickname: string
  calledFrom?: 'searchUserList'
  setIsDropDownView: (v: boolean) => void
}

export default function EditBlock(props: EditBlockProps) {
  const { channelUserInfo, setChannelUserInfo } = useJoinChannel()
  const responseModal = useResponseModalState()
  const { setModalName } = useModalState()
  const { user, setUser } = useGetUser()
  const { setApiError } = useErrorCheck()

  const changeItem = (newType) => {
    const result = user
    if (newType) {
      result.isFriend = false
    }
    result.isBlocked = newType
    setUser(result)
  }

  const { setTotalBlockCount, totalBlockCount } = useGetBlocks()

  const changeArrayItem = (newType, idToChange) => {
    if (!channelUserInfo) {
      return
    } else {
      const result = channelUserInfo.map((item) => {
        if (item.nickname === idToChange) {
          if (newType) {
            return {
              ...item,
              isBlocked: newType,
              isFriend: false,
            }
          }
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
  }

  const blockHandler = async () => {
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
          setTotalBlockCount(totalBlockCount + 1)
          if (props.calledFrom === 'searchUserList') {
            changeItem(true)
          }
          changeArrayItem(true, props.nickname)
        })
    } catch (e) {
      console.log(e)
      if (e && e.response.status === 401) setApiError(401)
      console.log(e.message)
    }
  }

  const unBlockHandler = async () => {
    props.setIsDropDownView(false)
    try {
      await instance
        .delete(`/users/blocks`, {
          data: {
            blockId: props.friendId,
          },
          withCredentials: true,
        })
        .then(function (res) {
          console.log(res)
          setTotalBlockCount(totalBlockCount - 1)
          if (props.calledFrom === 'searchUserList') {
            changeItem(false)
          }
          changeArrayItem(false, props.nickname)
          // }
        })
    } catch (e) {
      if (e && e.response.status === 401) setApiError(401)
      console.log(e.message)
    }
  }

  const setBlockModal = () => {
    setModalName('response')
    props.setIsDropDownView(false)
    props.isBlocked
      ? responseModal.setResponseModalState(
          '유저 차단',
          `${props.nickname}님을 차단 해제 하시겠습니까?`,
          unBlockHandler,
        )
      : responseModal.setResponseModalState(
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
