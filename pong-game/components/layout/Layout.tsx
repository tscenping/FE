import Image from 'next/image'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import noticeIcon from '@/public/img/layout/notice.svg'
import logoIcon from '@/public/img/layout/PONG GAME.svg'
import logoutIcon from '@/public/img/layout/logout.svg'
import styles from './Layout.module.scss'
import NotiBar from '../NotiBar/NotiBar'
import SideBarContent from './sideBar/SideBarContent'

function Layout({ children }: { children: ReactNode }): JSX.Element {
  const [viewNotiBar, setViewNotiBar] = useState<boolean>(false)

  return (
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
                <Image src={logoutIcon} alt={'logout'} />
              </li>
            </ul>
          </section>
        </aside>
        <section className={styles.mainMiddle}>{children}</section>
        <section className={styles.mainRight}></section>
      </main>
    </div>
  )
}

export default Layout
