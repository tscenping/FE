import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from '../../styles/components/Layout/ModalLayout.module.css'

function ModalOverlay(): JSX.Element {
  return <div className={styles.modalOverlay}></div>
}

function ModalContent(): JSX.Element {
  return (
    <div className={styles.modalContent}>
      <div className={styles.modal}></div>
    </div>
  )
}

function ModalLayout(): JSX.Element {
  const [isMounted, setIsMounted] = useState<boolean>(false)

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
