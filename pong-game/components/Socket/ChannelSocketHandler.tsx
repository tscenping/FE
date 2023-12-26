import { socket } from '@/socket/socket'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import GameInvitation from './Channel/GameInvitation'
import PrivateInvitation from './Channel/PrivateInvitation'
import ChannelMessage from './Channel/ChannelMesage'
import GameInvitationReply from './Channel/GameInvitationReply'
import ErrorMeassage from './Channel/ErrorMeassage'
import { useNickNameImage } from '@/store/login'

export default function ChannelSocketHandler() {
  const router = useRouter()
  const { myNickname } = useNickNameImage()
  useEffect(() => {
    try {
      if (myNickname && myNickname !== 'nickname') {
        const socketResponse = socket.connect()

        socket.on('connect', () => {
          console.log('channel connect')
        })
        const interval = setInterval(() => {
          socket.emit('ping')
        }, 20000) // 20초마다 ping을 보냄
        return () => {
          clearInterval(interval)
        }
      }
    } catch (error) {
      console.log('Error : ', error)
    }
    return () => {
      socket.close()
      socket.disconnect()
      // socket.off('connect')
    }
  }, [myNickname])
  return (
    <>
      <ChannelMessage />
      <GameInvitation />
      <PrivateInvitation />
      <GameInvitationReply />
      <ErrorMeassage />
    </>
  )
}
