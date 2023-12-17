import { useEffect } from 'react'
import { useJoinChannel } from '@/store/chat'
import { socket } from '@/socket/socket'

interface messageProps {
  nickname: string
  message: string
  channelId: number
}

function ChannelMessage(): JSX.Element {
  const { channelId, channelUserInfo, setChannelLog } = useJoinChannel()

  const handleReceiveMessage = (message: messageProps) => {
    const time = new Date()
    const hour = String(time.getHours()).padStart(2, '0')
    const minute = String(time.getMinutes()).padStart(2, '0')
    if (channelId === message.channelId) {
      const isBlockedUser =
        channelUserInfo &&
        channelUserInfo.some((user) => user.isBlocked && user.nickname === message.nickname)
      if (isBlockedUser) {
        // 채널에 차단된 유저에게 온 메세지인 경우
        setChannelLog({
          nickname: '',
          message: '차단된 유저의 메세지 입니다.',
          time: `${hour} : ${minute}`,
        })
      } else {
        // 채널에 차단된 유저에게 온 메세지가 아닌 경우
        setChannelLog({
          nickname: message.nickname,
          message: message.message,
          time: `${hour} : ${minute}`,
        })
      }
    }
  }

  const handlerReceiveNotice = (message) => {
    console.log(message)
    if (channelId === message.channelId) {
      setChannelLog({
        nickname: message.nickname,
        eventType: message.eventType,
        channelId: message.channelId,
      })
    }
  }

  useEffect(() => {
    socket.on('message', handleReceiveMessage)
    socket.on('notice', handlerReceiveNotice)
    return () => {
      socket.off('message', handleReceiveMessage) // 컴포넌트가 언마운트되면 이벤트 핸들러 정리
      socket.off('notice', handlerReceiveNotice)
    }
  }, [socket, channelId, channelUserInfo])
  return <></>
}

export default ChannelMessage
