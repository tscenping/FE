import { socket } from '@/socket/socket'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import styles from './GameInvitation.module.scss'
import { instance } from '@/util/axios'
import { useRouter, NextRouter } from 'next/router'
import { useLodingState } from '@/store/loding'
import { useModalState } from '@/store/store'
import { useErrorCheck } from '@/store/login'

interface toastData {
  invitationId: number
  invitingUserNickname: string
  gameType: 'SPECIAL_INVITE' | 'NORMAL_INVITE'
  toastId?: string
  setResponseFlag?: (v: boolean) => void
}

export default function GameInvitation() {
  const router: NextRouter = useRouter()
  const { setApiError } = useErrorCheck()

  const { setLodingState } = useLodingState()
  const { setModalName } = useModalState()
  const notify = (props: toastData) =>
    toast(
      (t) => {
        const acceptHandler = async (invitationId: number) => {
          console.log('acceptHandler')
          try {
            await instance.post('/game/accept', { gameInvitationId: invitationId }).then((res) => {
              console.log('수락 성공')
              setLodingState({ isLoding: false })
              setModalName(null)
            })
          } catch (e) {
            if (e && e.response.status === 401) setApiError(401)
            console.log(e.message)
          }
        }
        const declineHandler = async (invitationId: number) => {
          console.log('declineHandler')
          try {
            await instance.delete(`/game/refuse/${invitationId}`).then((res) => {
              console.log('거절 성공')
            })
          } catch (e) {
            if (e && e.response.status === 401) setApiError(401)
            console.log(e.message)
          }
        }

        // useEffect(() => {
        //   console.log('useEffect')
        //   const invitationId = props.invitationId
        //   const cancelTimeout = setTimeout(() => {
        //     if (!requestFlag) {
        //       toast.remove(t.id)
        //     }
        //   }, 7500)
        //   return () => {
        //     clearTimeout(cancelTimeout)
        //     if (!requestFlag) {
        //       console.log(123, invitationId)
        //       declineHandler(invitationId)
        //     }
        //   }
        // }, [])

        return (
          <div className={styles.toastBackGround}>
            <section className={styles.toastMsg}>
              {props.invitingUserNickname}님이{' '}
              {props.gameType === 'NORMAL_INVITE' ? 'Normal' : 'Speical'}게임에 초대하였습니다.
            </section>
            <section className={styles.responseBtn}>
              <button
                onClick={() => (toast.remove(t.id), acceptHandler(props.invitationId))}
                className={styles.acceptBtn}
              >
                수락
              </button>
              <button
                onClick={() => (toast.remove(t.id), declineHandler(props.invitationId))}
                className={styles.declineBtn}
              >
                거절
              </button>
            </section>
          </div>
        )
      },
      { duration: 9000 },
    )

  useEffect(() => {
    if (router.pathname !== '/match') {
      socket.on('gameInvitation', (data: toastData) => {
        toast.remove()
        notify({
          invitationId: data.invitationId,
          invitingUserNickname: data.invitingUserNickname,
          gameType: data.gameType,
        })
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
