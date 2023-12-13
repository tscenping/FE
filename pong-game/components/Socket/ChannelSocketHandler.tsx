import { socket } from '@/socket/socket'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import styles from './ChannelSocketHandler.module.scss'
import { instance } from '@/util/axios'
interface toastData {
  invitationId: number
  invitingUserNickname: string
  gameType: 'SPECIAL_INVITE' | 'NORMAL_INVITE'
  toastId?: string
  setResponseFlag?: (v: boolean) => void
}

export default function ChannelSocketHandler() {
  const CancelHandler = (props) => {
    useEffect(() => {
      const cancelTimeout = setTimeout(() => {
        toast.remove(props.toastId)
        console.log(123)
      }, 9000)
      return () => {
        clearTimeout(cancelTimeout)
      }
    }, [])

    return <></>
  }
  const notify = (props: toastData) =>
    toast(
      (t) => (
        <div className={styles.toastBackGround}>
          <section className={styles.toastMsg}>
            {props.invitingUserNickname}님이{' '}
            {props.gameType === 'NORMAL_INVITE' ? 'Normal' : 'Speical'}게임에 초대하였습니다.
          </section>
          <section className={styles.responseBtn}>
            <button onClick={() => toast.remove(t.id)} className={styles.acceptBtn}>
              수락
            </button>
            <button onClick={() => toast.remove(t.id)} className={styles.declineBtn}>
              거절
            </button>
          </section>
          <CancelHandler toastId="t.id" />
        </div>
      ),
      { duration: 10000 },
    )
  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      console.log('channel connect')
    })
    socket.on('gameInvitation', (data: toastData) => {
      notify({
        invitationId: data.invitationId,
        invitingUserNickname: data.invitingUserNickname,
        gameType: data.gameType,
      })
    })
    return () => {
      socket.disconnect()
    }
  }, [])
  return <></>
}
