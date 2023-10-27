import Image from 'next/image'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import noticeIcon from '@/public/img/layout/notice.svg'
import logoIcon from '@/public/img/layout/PONG GAME.svg'
import gameIcon from '@/public/img/layout/game.svg'
import chatIcon from '@/public/img/layout/chat.svg'
import myPageIcon from '@/public/img/layout/mypage.svg'
import rankIcon from '@/public/img/layout/rank.svg'
import logoutIcon from '@/public/img/layout/logout.svg'
import friendsIcon from '@/public/img/layout/friend.svg'
import styles from './Layout.module.css'
import NotiBar from '../NotiBar/NotiBar'

function Layout({ children }: { children: ReactNode }): JSX.Element {
  const [viewNotiBar, setViewNotiBar] = useState<boolean>(false)

  return (
    <div
      className={styles.entirePage}
      onClick={() => viewNotiBar && setViewNotiBar(false)}
    >
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/main">
            <Image className={styles.logo} src={logoIcon} alt={'logo'} />
          </Link>
          {/* <button onClick={() => setViewNotiBar(prev => !prev)} className={styles.btn}> */}
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
              <li>
                <Link href="/main">
                  <Image
                    src={gameIcon}
                    alt={'game'}
                    className={styles.gameImg}
                  />
                </Link>
              </li>
              <li>
                <Link href="/rank">
                  <Image src={rankIcon} alt={'rank'} />
                </Link>
              </li>
              <li>
                <Link href="/friends">
                  <Image src={friendsIcon} alt={'friends'} />
                </Link>
              </li>
              <li>
                <Link href="/chat">
                  <Image src={chatIcon} alt={'chat'} />
                </Link>
              </li>
              <li>
                <Link href="/mypage">
                  <Image src={myPageIcon} alt={'mypage'} />
                </Link>
              </li>
            </ul>
            <ul className={styles.sideBarContainerBottom}>
              <li>
                <Image src={logoutIcon} alt={'logout'} />
              </li>
            </ul>
          </section>
        </aside>
        <section className={styles.mainMiddle}>{children}</section>
        <section className={styles.mainRight}>
          
        </section>
      </main>
    </div>
  )
}

export default Layout
