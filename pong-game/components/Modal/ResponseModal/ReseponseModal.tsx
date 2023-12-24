import React from 'react'
import styles from './ReseponseModal.module.scss'
import { useModalState, useResponseModalState } from '@/store/store'

export default function ReseponseModal() {
  const { setModalName } = useModalState()
  const { title, content, onConfirm } = useResponseModalState()
  const handleConfirm = () => {
    onConfirm()
    setModalName(null)
  }
  const handleCancel = () => {
    setModalName(null)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className={styles.modalActions}>
          {onConfirm ? (
            <>
              <button onClick={handleConfirm}>예</button>
              <button onClick={handleCancel}>아니오</button>
            </>
          ) : (
            <button onClick={handleCancel}>확인</button>
          )}
        </div>
      </div>
    </div>
  )
}
