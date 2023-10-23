import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from '../../styles/components/Layout/ModalLayout.module.css'
import UserProfile from '../Modal/UserProfile/UserProfile'
import { useModalState, useUserProfileModalState } from '@/store/store'

interface ModalProps {
  modalName: string
}

function ModalOverlay(): JSX.Element {
  const { modalName, setModalName } = useModalState()
  return (
    <>{modalName !== null && <div className={styles.modalOverlay} onClick={()=> setModalName(null)}></div>}</>
  )
}

function ModalContent({}): JSX.Element {
  const { modalName, setModalName } = useModalState()
  const modalContent: { [key: string]: JSX.Element | null } = {
    'userProfile': <UserProfile />,
  }
  return (
    <>
      {modalName !== null && (
        <div className={styles.modalContent}>
          
          <div className={styles.modal}>
          {modalName ? modalContent[modalName]: null}
          <button onClick={() => setModalName(null)}>asd</button>
          </div>
        </div>
      )}
    </>
  )
}

function ModalLayout({}): JSX.Element {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { modalName } = useModalState()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (typeof window === 'undefined') return <></>
  if (!isMounted) return <></>

  return (
    <>
      {createPortal(
        <ModalOverlay />,
        document.getElementById('modalOverlay') as HTMLElement,
      )}
      {createPortal(
        <ModalContent />,
        document.getElementById('modalContent') as HTMLElement,
      )}
    </>
  )
}

export default ModalLayout
