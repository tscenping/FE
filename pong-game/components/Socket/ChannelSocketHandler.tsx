import { socket } from '@/socket/socket'
import { useEffect } from 'react'

import GameInvitation from './Channel/GameInvitation'
import PrivateInvitation from './Channel/PrivateInvitation'
import ChannelMessage from './Channel/ChannelMesage'
import GameInvitationReply from './Channel/GameInvitationReply'

export default function ChannelSocketHandler() {
  useEffect(() => {
    try {
      socket.connect()
      socket.on('connect', () => {
        console.log('channel connect')
      })
    } catch (error) {
      console.log('Error : ', error)
    }
    return () => {
      socket.disconnect()
      socket.off('connect')
    }
  }, [])
  return (
    <>
      <ChannelMessage />
      <GameInvitation />
      <PrivateInvitation />
      <GameInvitationReply />
    </>
  )
}
