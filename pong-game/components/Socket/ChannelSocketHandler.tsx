import { socket } from '@/socket/socket'
import { useEffect, useState } from 'react'

import styles from './ChannelSocketHandler.module.scss'
import { instance } from '@/util/axios'
import GameInvitation from './Channel/GameInvitation'

export default function ChannelSocketHandler() {
  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      console.log('channel connect')
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <>
      <GameInvitation />
    </>
  )
}
