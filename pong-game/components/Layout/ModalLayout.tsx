import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './ModalLayout.module.scss'
import UserProfile from '../Modal/UserProfile/UserProfileModal'
import { useModalState } from '@/store/store'
import CreateChatRoom from '../Modal/CreateRoom/CreateRoom'
import CreateDmRoom from '../Modal/CreateDmRoom/CreateDmRoom'
import ReseponseModal from '../Modal/ResponseModal/ReseponseModal'
import ExitRoom from '../Modal/ExitRoom/ExitRoom'
import ChangeImage from '../Modal/ChangeImage/ChangeImage'

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
        <div className={styles.modalOverlay} onClick={() => setModalName(null)}></div>
      )}
    </>
  )
}

function ModalContent({}): JSX.Element {
  const { modalName } = useModalState()
  const modalContent: { [key: string]: JSX.Element | null } = {
    userProfile: <UserProfile />,
    createDmRoom: <CreateDmRoom />,
    createChatRoom: <CreateChatRoom />,
    exitRoom: <ExitRoom />,
    response: <ReseponseModal />,
    changeImage: <ChangeImage />,
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
