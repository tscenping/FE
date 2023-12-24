import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import noticeIcon from '@/public/img/layout/notice.svg'
import logoIcon from '@/public/img/layout/PONG GAME.svg'
import logoutIcon from '@/public/img/layout/logout.svg'
import styles from './Layout.module.scss'
import NotiBar from '../NotiBar/NotiBar'
import { useRouter, NextRouter } from 'next/router'
import { useNickNameImage } from '@/store/login'
import { instance } from '@/util/axios'
import { useModalState, useResponseModalState } from '@/store/store'
import { socket } from '@/socket/socket'
import SideBarContent from './SideBar/SideBarContent'

function Layout({ children }: { children: ReactNode }): JSX.Element {
  const [viewNotiBar, setViewNotiBar] = useState<boolean>(false)
  const router: NextRouter = useRouter()
  const loginPage = router.pathname === '/login' || router.pathname === '/login/info'
  const { setAvatar, setMyNickname } = useNickNameImage()
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()
  const logoutHandler = async () => {
    try {
      await instance.patch('/auth/signout', {}).then(function (res) {
        console.log(res)
      })
      socket.disconnect()
      setMyNickname(null)
      setAvatar(null)
    } catch (e) {
      console.log(e.message)
    }
  }
  const logoutModal = () => {
    setModalName('response')
    responseModal.setResponseModalState('로그아웃', '로그아웃 하시겠습니까?', logoutHandler)
  }

  useEffect(()=>{
console.log('layout')
  },[])

  return (
    <>
      {!loginPage ? (
        <div className={styles.entirePage} onClick={() => viewNotiBar && setViewNotiBar(false)}>
          <header className={styles.header}>
            <div className={styles.headerContainer}>
              <Link href="/main">
                <Image className={styles.logo} src={logoIcon} alt={'logo'} />
              </Link>
              <Image
                className={styles.notice}
                src={noticeIcon}
                alt={'notice'}
                width={40}
                height={40}
                onClick={() => setViewNotiBar((prev) => !prev)}
              />
              <div className={styles.notiBar}>{<NotiBar />}</div>
            </div>
          </header>
          <main className={styles.main}>
            <aside className={styles.sideBar}>
              <section className={styles.sideBarContainer}>
                <ul className={styles.sideBarContainerTop}>
                  <SideBarContent content="main" />
                  <SideBarContent content="rank" />
                  <SideBarContent content="friends" />
                  <SideBarContent content="chat" />
                  <SideBarContent content="mypage" />
                </ul>
                <ul className={styles.sideBarContainerBottom}>
                  <li>
                    <Image src={logoutIcon} alt={'logout'} onClick={logoutModal} />
                  </li>
                </ul>
              </section>
            </aside>
            <section className={styles.mainMiddle}>{children}</section>
            <section className={styles.mainRight}></section>
          </main>
        </div>
      ) : (
        <section className={styles.mainMiddle}>{children}</section>
      )}
    </>
  )
}

export default Layout
