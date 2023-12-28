import { socket } from '@/socket/socket'
import { useEffect } from 'react'
import GameInvitation from './Channel/GameInvitation'
import PrivateInvitation from './Channel/PrivateInvitation'
import ChannelMessage from './Channel/ChannelMesage'
import GameInvitationReply from './Channel/GameInvitationReply'
import ErrorMeassage from './Channel/ErrorMessage'
import { useNickNameImage } from '@/store/login'
import { useRouter } from 'next/router'

export default function ChannelSocketHandler() {
  const { myNickname } = useNickNameImage()
  const router = useRouter()

  useEffect(() => {
    try {
      if (myNickname !== null && myNickname !== 'nicknameDefault') {
        socket.connect()
        socket.on('connect', () => {
          console.log('channel connect')
        })
        socket.on('disconnect', () => {
          console.log('channel disconnect')
          router.push('/main')
        })
      }
    } catch (error) {
      console.log('Error : ', error)
    }
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.close()
      socket.disconnect()
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
