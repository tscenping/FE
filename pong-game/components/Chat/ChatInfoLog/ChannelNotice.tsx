import { useEffect } from 'react'
import styles from './ChannelNotice.module.scss'
import { useJoinChannel, useJoinProtectedChannel, useNavBarState } from '@/store/chat'
import { instance } from '@/util/axios'
import { useNickNameImage } from '@/store/login'
import { useModalState, useResponseModalState } from '@/store/store'

interface useChannelUserInfoProps {
  channelUserId?: number
  userId?: number
  nickname?: string
  avatar?: string
  isFriend?: boolean
  isBlocked?: boolean
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
}

interface ChannelNoticeProps {
  nickname: string
  eventType: string
  channelId: number
  channelUserInfo: useChannelUserInfoProps[]
}

function ChannelNotice(props: ChannelNoticeProps): JSX.Element {
  const {
    channelTitle,
    setChannelUserInfo,
    setChannelId,
    setChannelLogEmpty,
    setMyChannelUserType,
  } = useJoinChannel()
  const { myNickname } = useNickNameImage()
  const { setModalName } = useModalState()
  const { setResponseModalState } = useResponseModalState()
  const { setPasswordInputRender } = useJoinProtectedChannel()
  const { setTabState } = useNavBarState()

  const getChannelUsersHandler = async () => {
    const response = await instance(`/channels/enter/${props.channelId}`, {
      method: 'get',
    })
    setChannelUserInfo(response.data.channelUsers)
    setMyChannelUserType(response.data.myChannelUserType)
  }

  useEffect(() => {
    if (myNickname !== props.nickname) {
      if (props.eventType === 'JOIN') {
        getChannelUsersHandler()
      }
      if (
        props.eventType === 'EXIT' ||
        props.eventType === 'KICK' ||
        props.eventType === 'BAN' ||
        props.channelUserInfo
      ) {
        // const filterChannelUsers = props.channelUserInfo.filter((channelUser) => {
        //   if (props.nickname !== channelUser.nickname) {
        //     return channelUser
        //   }
        // })
        const filterChannelUsers = props.channelUserInfo
          ? props.channelUserInfo.filter((channelUser) => props.nickname !== channelUser.nickname)
          : []

        setChannelUserInfo(filterChannelUsers)
      }
      if (props.eventType === 'ADMIN') {
        getChannelUsersHandler()
      }
      if (props.eventType === 'ADMIN_CANCEL') {
        getChannelUsersHandler()
      }
      if (props.eventType === 'MUTE') {
        getChannelUsersHandler()
      }
    }

    if (myNickname === props.nickname) {
      // if (props.eventType === 'KICK') {
      //   setChannelId(null)
      //   setChannelLogEmpty([])
      //   setChannelUserInfo(null)
      //   setPasswordInputRender('DEFAULT')
      //   setTabState('ENTIRE')
      //   setResponseModalState(channelTitle, '채널에서 강퇴당하였습니다.', null)
      //   setModalName('response')
      // }
      // if (props.eventType === 'BAN') {
      //   setChannelId(null)
      //   setChannelLogEmpty([])
      //   setChannelUserInfo(null)
      //   setPasswordInputRender('DEFAULT')
      //   setTabState('ENTIRE')
      //   setResponseModalState(channelTitle, '채널에서 밴 당하였습니다.', null)
      //   setModalName('response')
      // }
      // if (props.eventType === 'ADMIN') {
      //   getChannelUsersHandler()
      // }
      // if (props.eventType === 'ADMIN_CANCEL') {
      //   getChannelUsersHandler()
      // }
      const resetChannelState = () => {
        setChannelId(null)
        setChannelLogEmpty([])
        setChannelUserInfo(null)
        setPasswordInputRender('DEFAULT')
        setTabState('ENTIRE')
      }

      if (props.eventType === 'KICK' || props.eventType === 'BAN') {
        resetChannelState()
        setResponseModalState(
          channelTitle,
          `채널에서 ${props.eventType === 'KICK' ? '강퇴' : '밴'} 당하였습니다.`,
          null,
        )
        setModalName('response')
      } else if (props.eventType === 'ADMIN' || props.eventType === 'ADMIN_CANCEL') {
        getChannelUsersHandler()
      }
    }
  }, [])

  const eventMessages = {
    JOIN: '입장하였습니다',
    EXIT: '퇴장하였습니다',
    KICK: '강퇴 당하였습니다',
    BAN: '밴 당하였습니다',
    ADMIN: '관리자로 임명되었습니다',
    ADMIN_CANCEL: '관리자에서 해임되었습니다',
    MUTE: '30초간 채팅금지 당하였습니다',
  }

  const eventType = props.eventType
  const eventMessage = eventMessages[eventType]

  return (
    <div className={styles.channelNotice}>
      <div></div>
      {eventMessage && (
        <strong className={styles.channelNoticeMessage}>
          "{props.nickname}"님이 {eventMessage}
        </strong>
      )}
      <div></div>
    </div>
  )
}

export default ChannelNotice
