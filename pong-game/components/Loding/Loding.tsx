import { useLodingState } from '@/store/loding'
import { ReactNode } from 'react'
import styles from './Loding.module.scss'
import lodingImg from '@/public/img/loding/loding.svg'
import Image from 'next/image'

export default function Loding({ children }: { children: ReactNode }): JSX.Element {
  const { lodingState, setLodingState } = useLodingState()
  const lodingText = {
    inviteGame: '게임 초대중',
    searchGame: '상대를 찾는중 입니다.',
  }
  const autoCancelHandler = () => {}
  const lodingCancelHandler = () => {
    setLodingState({ isLoding: false })
  }
  return (
    <>
      {lodingState.isLoding ? (
        <>
          <div className={styles.lodingOverlay}></div>
          <section className={styles.lodingContent}>
            <Image src={lodingImg} alt={'out room'} width={250} />
            <div className={styles.lodingText}>
              {lodingState.lodingTitle ? lodingText[lodingState.lodingTitle] : '로딩중 입니다.'}
              <button onClick={() => (lodingCancelHandler(), lodingState.cancelHandler())}>
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
