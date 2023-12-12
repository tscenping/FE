import { socket } from '@/socket/socket'
import { useModalState } from '@/store/store'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import styles from './ChannelSocketHandler.module.scss'
import { instance } from '@/util/axios'
interface toastData {
  invitationId: number
  invitingUserNickname: string
  gameType: 'SPECIAL_INVITE' | 'NORMAL_INVITE'
}

export default function ChannelSocketHandler() {
  const notify = (props: toastData) =>
    toast(
      (t) => (
        <div className={styles.toastBackGround}>
          <section className={styles.toastMsg}>{props.invitingUserNickname}님이 {props.gameType==='NORMAL_INVITE' ? "Normal" : "Speical"}게임에 초대하였습니다.</section>
          <section className={styles.responseBtn}>
            <button onClick={() => (

              toast.dismiss(t.id))} className={styles.acceptBtn}>
              수락
            </button>
            <button onClick={() => toast.dismiss(t.id)} className={styles.declineBtn}>
              거절
            </button>
          </section>
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
      console.log('gameInvitation response : ', data)
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
