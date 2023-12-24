import { useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { instance } from '@/util/axios'
import { useRouter } from 'next/router'
import { socket } from '@/socket/socket'
import { useGetBlocks } from '@/store/friend'
import { useJoinChannel, useJoinProtectedChannel, useNavBarState } from '@/store/chat'
import styles from './PrivateInvitation.module.scss'

function PrivateInvitation(): JSX.Element {
  const router = useRouter()
  const { allBlocks } = useGetBlocks()
  const {
    setChannelLogEmpty,
    setChannelTitle,
    setChannelId,
    setChannelType,
    setChannelUserInfo,
    setChannelAuth,
  } = useJoinChannel()
  const { setPasswordInputRender } = useJoinProtectedChannel()
  const { setTabState } = useNavBarState()

  const acceptHandler = useCallback(
    async (t, invitationId) => {
      const datas = { invitationId: invitationId }
      try {
        const response = await instance('/channels/accept', {
          method: 'post',
          data: JSON.stringify(datas),
        })
        if (router.pathname !== '/chat') {
          router.replace('/chat')
        }
        const postData = { channelId: response.data.channelId, password: null }
        const responseEnter = await instance(`/channels/enter/${response.data.channelId}`, {
          method: 'get',
          data: JSON.stringify(postData),
        })
        setChannelLogEmpty([])
        setPasswordInputRender('CHANNEL')
        setChannelTitle(response.data.channelName)
        setChannelId(response.data.channelId)
        setChannelUserInfo(responseEnter.data.channelUsers)
        setChannelType('PRIVATE')
        setTabState('JOINED')
        setChannelAuth('MEMBER')
        toast.remove(t.id)
      } catch (error) {
        toast.remove(t.id)
        console.log('Error : ', error)
      }
    },
    [
      router,
      setChannelAuth,
      setChannelId,
      setChannelLogEmpty,
      setChannelTitle,
      setChannelType,
      setChannelUserInfo,
      setPasswordInputRender,
      setTabState,
    ],
  )

  const cancelHandler = async (t, invitationId) => {
    await instance(`/channels/refuse/${invitationId}`, {
      method: 'delete',
    })
    toast.remove(t.id)
  }

  useEffect(() => {
    if (router.pathname !== '/match') {
      socket.on('privateAlert', (msg) => {
        // msg.invitingUserId가 차단된 유저인지 확인
        const isBlockedUser = allBlocks.some(
          (blockUser) => blockUser.nickname === msg.invitingUserId,
        )

        // 차단된 유저가 아닌 경우에만 toast 로직 실행
        if (!isBlockedUser) {
          toast(
            (t) => {
              console.log('aaaa')
              return (
                <div className={styles.toastContainer}>
                  <section className={styles.toastMessage}>
                    <strong className={styles.inviteChannel}>{msg.invitingUserId}</strong>
                    <span> 님이 채널에서 초대를 보냈습니다.</span>
                  </section>
                  <section className={styles.toastButton}>
                    <button onClick={() => acceptHandler(t, msg.invitationId)}>수 락</button>{' '}
                    {/* 채팅 초대 수락 api, 따로 핸들러 함수 만들어서 실행*/}
                    <button onClick={() => cancelHandler(t, msg.invitationId)}>거 절</button>{' '}
                    {/* 채팅 초대 거절 api, 따로 핸들러 함수 만들어서 실행*/}
                  </section>
                </div>
              )
            },
            { duration: 10000, id: 'privateChatInvite' },
          )
        }
      })
    }
    return () => {
      socket.off('privateAlert')
    }
  }, [allBlocks, router.pathname, acceptHandler])
  return <></>
}

export default PrivateInvitation
