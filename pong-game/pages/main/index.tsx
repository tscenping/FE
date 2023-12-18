import styles from './index.module.scss'
import { useState, useEffect, JSXElementConstructor } from 'react'

import PageTitle from '@/components/UI/PageTitle'
import RankGame from '@/components/Game/RankGame'
import NormalGame from '@/components/Game/NormalGame'
import { useRouter, NextRouter } from 'next/router'
import toast from 'react-hot-toast'
import { gameSocket } from '@/socket/gameSocket'

export default function Home() {
  const [gameState, setGameState] = useState<string>('')
  const [pageState, setPageState] = useState(1)
  const router: NextRouter = useRouter()
  // useEffect(() => {
  //   gameSocket.on('gameInvitation', (data) => {
  //     console.log(data)
  //   })
  // }, [])

  const onClickLadderBtn = () => {
    // setGameState('rank')
    router.push('/match')
  }
  const onClickNomalBtn = () => {
    setGameState('nomal')
    setPageState(2)
  }
  // useEffect(() => {
  //   gameSocket.on('gameInvitation', (data) => {
  //     console.log(123)
  //     console.log(data)
  //   })
  // }, [gameSocket])
  // const ToastHandler = () => {
  //   console.log(123)
  // }
  // const notify = () =>
  // toast((t) => (
  //   <div className={styles.toastBackGround}>
  //     <section className={styles.toastMsg}>him님이 게임에 초대하였습니다.</section>
  //     <section className={styles.responseBtn}>
  //       <button onClick={() => toast.dismiss(t.id)} className={styles.acceptBtn}>
  //         수락
  //       </button>
  //       <button onClick={() => toast.dismiss(t.id)} className={styles.declineBtn}>
  //         거절
  //       </button>
  //     </section>
  //   </div>
  // ))
  //   // toast.custom(
  //   (t) => (
  //     <div className={styles.toastBackGround}>
  //       <section className={styles.toastMsg}>
  //         him님이 게임에 초대하였습니다. 수락하시겠습니까?{' '}
  //       </section>
  //       <section className={styles.responseBtn}>
  //         <button onClick={() => toast.dismiss(t.id)} className={styles.acceptBtn}>
  //           수락
  //         </button>
  //         <button onClick={() => toast.dismiss(t.id)} className={styles.declineBtn}>
  //           거절
  //         </button>
  //       </section>
  //     </div>
  //   ),
  //   {
  //     duration: 10000,
  //     position: 'top-center',

  //     style: {backgroundColor: 'white'},
  //     className: '',

  //     icon: '👏',

  //     iconTheme: {
  //       primary: '#000',
  //       secondary: '#fff',
  //     },

  //     ariaProps: {
  //       role: 'status',
  //       'aria-live': 'polite',
  //     },
  //   },
  // )
  return (
    <div className={styles.backGround}>
      {/* <button onClick={notify}>Make me a toast</button> */}
      {gameState ? (
        gameState === 'nomal' ? (
          <NormalGame setPageState={setPageState} setGameState={setGameState} />
        ) : (
          <RankGame />
        )
      ) : (
        <div>
          <section>
            <div className={styles.title}>
              <PageTitle
                title="Game Start"
                subTitle="일반게임과 래더게임 중 하나를 선택해주세요."
              />
            </div>
          </section>
          <section className={styles.btn}>
            <button className={styles.gameBtn} onClick={onClickLadderBtn}>
              Ladder
            </button>
            <button className={styles.gameBtn} onClick={onClickNomalBtn}>
              Normal
            </button>
          </section>
        </div>
      )}
      <section className={styles.pageNation}>
        {pageState === 1 ? (
          <div className={styles.nowPage}></div>
        ) : (
          <div className={styles.prvPage}></div>
        )}
        {pageState === 2 ? (
          <div className={styles.nowPage}></div>
        ) : (
          <div className={styles.prvPage}></div>
        )}
      </section>
    </div>
  )
}
