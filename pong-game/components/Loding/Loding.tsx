import { useLodingState } from '@/store/loding'
import { ReactNode, use, useEffect } from 'react'
import styles from './Loding.module.scss'
import lodingImg from '@/public/img/loding/loding.svg'
import Image from 'next/image'
import { instance } from '@/util/axios'
import { useModalState } from '@/store/store'
import { clear } from 'console'

interface LodingProps {
  isLoding: boolean
  lodingTitle: 'inviteGame' | 'searchGame'
  gameType?: 'NORMAL_MATCH' | 'SPECIAL_MATCH' | 'LADDER'
}

export default function Loding({ children }: { children: ReactNode }): JSX.Element {
  const { lodingState, setLodingState } = useLodingState()
  const lodingText = {
    inviteGame: '게임 초대중',
    searchGame: '상대를 찾는중 입니다.',
  }

  const serchCancelHandler = async () => {
    try {
      await instance.delete(`/game/match/${lodingState.gameType}`).then((res) => {
        console.log('취소 성공')
      })
    } catch (e) {
      console.log(e.message)
    }
    setLodingState({ isLoding: false })
  }

  const inviteCancelHandler = async () => {
    try {
      await instance.delete(`/game/invite/${lodingState.gameInvitationId}`, {}).then((res) => {
        console.log('취소 성공')
      })
    } catch (error) {}
    setLodingState({ isLoding: false })
  }

  const autoCancelHandler = () => {
    console.log('auto')
    if (lodingState.lodingTitle === 'inviteGame') {
      inviteCancelHandler()
    } else {
      serchCancelHandler()
    }
    setLodingState({ isLoding: false })
  }

  useEffect(() => {
    let autoCancel
    if (lodingState.isLoding) {
      autoCancel = setTimeout(() => {
        autoCancelHandler()
      }, 9500)
    }
    return () => {
      clearTimeout(autoCancel)
    }
  }, [lodingState])
  return (
    <>
      {lodingState.isLoding ? (
        <>
          <div className={styles.lodingOverlay}></div>
          <section className={styles.lodingContent}>
            <Image src={lodingImg} alt={'out room'} width={250} />
            <div className={styles.lodingText}>
              {lodingState.lodingTitle ? lodingText[lodingState.lodingTitle] : '로딩중 입니다.'}
              <button
                onClick={() =>
                  lodingState.lodingTitle === 'inviteGame'
                    ? inviteCancelHandler()
                    : serchCancelHandler()
                }
              >
                취소
              </button>
            </div>
          </section>
          {children}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
