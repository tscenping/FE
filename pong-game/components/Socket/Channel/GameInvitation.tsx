import { socket } from '@/socket/socket'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import styles from './GameInvitation.module.scss'
import { instance } from '@/util/axios'

interface toastData {
  invitationId: number
  invitingUserNickname: string
  gameType: 'SPECIAL_INVITE' | 'NORMAL_INVITE'
  toastId?: string
  setResponseFlag?: (v: boolean) => void
}

interface acceptProps {
  gameInvitationId: number
}

export default function GameInvitation() {
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
  const acceptHandler = (props: acceptProps) => {
    instance.post('/game/accept', { gameInvitationId: props.gameInvitationId }).then((res) => {
      console.log(res)
    })
  }
  const declineHandler = (props: acceptProps) => {
    instance
      .delete('/game/refuse', { data: { gameInvitationId: props.gameInvitationId } })
      .then((res) => {
        console.log(res)
      })
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
            <button
              onClick={() => (
                toast.remove(t.id), acceptHandler({ gameInvitationId: props.invitationId })
              )}
              className={styles.acceptBtn}
            >
              수락
            </button>
            <button
              onClick={() => (
                toast.remove(t.id), declineHandler({ gameInvitationId: props.invitationId })
              )}
              className={styles.declineBtn}
            >
              거절
            </button>
          </section>
          <CancelHandler toastId="t.id" />
        </div>
      ),
      { duration: 10000 },
    )

  useEffect(() => {
    socket.on('gameInvitation', (data: toastData) => {
      notify({
        invitationId: data.invitationId,
        invitingUserNickname: data.invitingUserNickname,
        gameType: data.gameType,
      })
    })
  }, [socket])

  return <></>
}
