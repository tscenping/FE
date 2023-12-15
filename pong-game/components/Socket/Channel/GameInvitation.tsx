import { socket } from '@/socket/socket'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import styles from './GameInvitation.module.scss'
import { instance } from '@/util/axios'
import { useRouter, NextRouter } from 'next/router'

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
  const router: NextRouter = useRouter()
  const [invitationSocketStatus, setInvitationSocketStatus] = useState<'ON' | 'OFF'>('OFF')
  const notify = (props: toastData) =>
    toast(
      (t) => {
        const acceptHandler = async (props: acceptProps) => {
          await instance
            .post('/game/accept', { gameInvitationId: props.gameInvitationId })
            .then((res) => {
              console.log(res)
            })
        }
        const declineHandler = async (props: acceptProps) => {
          await instance
            .delete('/game/refuse', { data: { gameInvitationId: props.gameInvitationId } })
            .then((res) => {
              console.log(res)
            })
        }

        useEffect(() => {
          const cancelTimeout = setTimeout(() => {
            toast.remove(props.toastId)
          }, 9000)
          return () => {
            clearTimeout(cancelTimeout)
          }
        }, [])

        return (
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
          </div>
        )
      },
      { duration: 10000 },
    )

  useEffect(() => {
    if (router.pathname !== '/match') {
      socket.on('gameInvitation', (data: toastData) => {
        try {
          notify({
            invitationId: data.invitationId,
            invitingUserNickname: data.invitingUserNickname,
            gameType: data.gameType,
          })
        } catch (e) {
          console.log(e.message)
        }
      })
    }
    socket.on('gameStarted', (data) => {
      {
        router.push('/match')
      }
    })
    return () => {
      if (router.pathname !== '/match') {
        socket.off('gameInvitation')
      }
      console.log('clean up')
    }
  }, [socket, router.pathname])

  return <></>
}
