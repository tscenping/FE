import { socket } from '@/socket/socket'
import { useEffect, useState } from 'react'

import styles from './ChannelSocketHandler.module.scss'
import { instance } from '@/util/axios'
import GameInvitation from './Channel/GameInvitation'
import PrivateInvitation from './Channel/PrivateInvitation'

export default function ChannelSocketHandler() {
  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      console.log('channel connect')
    })
    return () => {
      socket.disconnect()
      socket.off('connect')
    }
  }, [])
  return (
    <>
      <GameInvitation />
      <PrivateInvitation />
    </>
  )
}
