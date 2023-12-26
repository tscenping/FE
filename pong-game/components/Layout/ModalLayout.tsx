import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './ModalLayout.module.scss'
import UserProfile from '../Modal/UserProfile/UserProfileModal'
import { useModalState } from '@/store/store'
import CreateChatRoom from '../Modal/CreateRoom/CreateRoom'
import ReseponseModal from '../Modal/ResponseModal/ReseponseModal'
import ExitRoom from '../Modal/ExitRoom/ExitRoom'
import ChangeImage from '../Modal/ChangeImage/ChangeImage'
import JoinRoom from '../Modal/JoinRoom/JoinRoom'
import JoinDmRoom from '../Modal/JoinDmRoom/JoinDmRoom'
import FriendUsersModal from '../Modal/FriendUsersModal/FriendUsersModal'
import InviteFriend from '../Modal/InviteFriend/InviteFriend'
import ChannelSetting from '../Modal/ChannelSetting/ChannelSetting'
import InviteGameModal from '../Modal/InviteGame/InviteGameModal'
import Mfa from '../Modal/Mfa/Mfa'
import GameResult from '../Modal/GameResult/GameResult'

function ModalOverlay(): JSX.Element {
  const { modalName, setModalName } = useModalState()

  useEffect(() => {
    if (modalName !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [modalName])

  return (
    <>
      {modalName !== null && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            if (modalName !== 'mfa') {
              setModalName(null)
            }
          }}
        ></div>
      )}
    </>
  )
}

function ModalContent({}): JSX.Element {
  const { modalName } = useModalState()
  const modalContent: { [key: string]: JSX.Element | null } = {
    userProfile: <UserProfile />,
    friendUsers: <FriendUsersModal />,
    createChatRoom: <CreateChatRoom />,
    exitRoom: <ExitRoom />,
    response: <ReseponseModal />,
    changeImage: <ChangeImage />,
    joinRoom: <JoinRoom />,
    joinDmRoom: <JoinDmRoom />,
    inviteFriend: <InviteFriend />,
    channelSetting: <ChannelSetting />,
    inviteGame: <InviteGameModal />,
    mfa: <Mfa />,
    matchResult: <GameResult/>
  }
  return (
    <>
      {modalName !== null && (
        <div className={styles.modalContent}>
          {/* <div className={styles.modal}> */}
          {modalName ? modalContent[modalName] : null}
          {/* </div> */}
        </div>
      )}
    </>
  )
}

function ModalLayout({}): JSX.Element {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (typeof window === 'undefined') return <></>
  if (!isMounted) return <></>

  return (
    <>
      {createPortal(<ModalOverlay />, document.getElementById('modalOverlay') as HTMLElement)}
      {createPortal(<ModalContent />, document.getElementById('modalContent') as HTMLElement)}
    </>
  )
}

export default ModalLayout
