import Image from 'next/image'
import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import noticeIcon from '@/public/img/layout/notice.svg'
import logoIcon from '@/public/img/layout/PONG GAME.svg'
import logoutIcon from '@/public/img/layout/logout.svg'
import styles from './Layout.module.scss'
import NotiBar from '../NotiBar/NotiBar'
import SideBarContent from './SideBar/SideBarContent'
import { useRouter, NextRouter } from 'next/router'
import { useNickNameImage } from '@/store/login'
import { instance } from '@/util/axios'
import { useModalState, useResponseModalState } from '@/store/store'
import { socket } from '@/socket/socket'
import { useJoinChannel } from '@/store/chat'
import { useGetBlocks } from '@/store/friend'
import toast from 'react-hot-toast'

interface messageProps {
  nickname: string
  message: string
  channelId: number
}

function Layout({ children }: { children: ReactNode }): JSX.Element {
  const [viewNotiBar, setViewNotiBar] = useState<boolean>(false)
  const { setChannelLog, channelId, channelUserInfo } = useJoinChannel()
  const router: NextRouter = useRouter()
  const loginPage = router.pathname === '/login' || router.pathname === '/login/info'
  const { setAvatar, setMyNickname } = useNickNameImage()
  const { setModalName } = useModalState()
  const { allBlocks } = useGetBlocks()
  const responseModal = useResponseModalState()

  const logoutHandler = async () => {
    await instance.patch('/auth/signout', {}).then(function (res) {
      console.log(res)
    })
    socket.disconnect()
    setMyNickname(null)
    setAvatar(null)
  }
  const logoutModal = () => {
    setModalName('response')
    responseModal.setResponseModalState('로그아웃', '로그아웃 하시겠습니까?', logoutHandler)
  }

  const handleReceiveMessage = (message: messageProps) => {
    const time = new Date()
    const hour = String(time.getHours()).padStart(2, '0')
    const minute = String(time.getMinutes()).padStart(2, '0')
    if (channelId === message.channelId) {
      const isBlockedUser =
        channelUserInfo &&
        channelUserInfo.some((user) => user.isBlocked && user.nickname === message.nickname)
      if (isBlockedUser) {
        // 채널에 차단된 유저에게 온 메세지인 경우
        setChannelLog({
          nickname: '',
          message: '차단된 유저의 메세지 입니다.',
          time: `${hour} : ${minute}`,
        })
      } else {
        // 채널에 차단된 유저에게 온 메세지가 아닌 경우
        setChannelLog({
          nickname: message.nickname,
          message: message.message,
          time: `${hour} : ${minute}`,
        })
      }
    }
  }

  useEffect(() => {
    socket.on('privateAlert', (msg) => {
      // msg.invitingUserId가 차단된 유저인지 확인
      const isBlockedUser = allBlocks.some((blockUser) => blockUser.nickname === msg.invitingUserId)

      // 차단된 유저가 아닌 경우에만 toast 로직 실행
      if (!isBlockedUser) {
        toast(
          (t) => (
            <div className={styles.toastContainer}>
              <section className={styles.toastMessage}>
                <strong className={styles.inviteChannel}>{msg.invitingUserId}</strong>
                <span> 님이 채널에서 초대를 보냈습니다.</span>
              </section>
              <section className={styles.toastButton}>
                <button onClick={() => toast.remove()}>수 락</button>{' '}
                {/* 채팅 초대 수락 api, 따로 핸들러 함수 만들어서 실행*/}
                <button onClick={() => toast.remove(t.id)}>거 절</button>{' '}
                {/* 채팅 초대 거절 api, 따로 핸들러 함수 만들어서 실행*/}
              </section>
            </div>
          ),
          { duration: 10000 },
        )
      }
    })

    return () => {
      socket.off('privateAlert')
    }
  }, [socket, allBlocks])

  useEffect(() => {
    socket.on('message', handleReceiveMessage)
    return () => {
      socket.off('message', handleReceiveMessage) // 컴포넌트가 언마운트되면 이벤트 핸들러 정리
    }
  }, [socket, channelId, channelUserInfo])

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
