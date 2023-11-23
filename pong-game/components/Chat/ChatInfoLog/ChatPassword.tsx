import { useRef } from 'react'
import Image from 'next/image'
import lock from '@/public/img/chat/lock.svg'
import submitMessage from '@/public/img/chat/enterInput.svg'
import styles from './ChatPassword.module.scss'
import ChatPasswordInput from '../Input/ChatPasswordInput'

function ChatPassword(): JSX.Element {
  const passwordRef = useRef<HTMLInputElement>(null)

  const passwordHandler = (e) => {
    e.preventDefault()
    passwordRef.current.value = ''
  }

  return (
    <div className={styles.chatPassword}>
      <div className={styles.chatRoomName}>
        <Image src={lock} alt={'password room'} />
        <h1 className={styles.RoomName}>채팅방 이름</h1>
      </div>
      {/* <p className={styles.wrongPassword}>잘못된 비밀번호 입니다.</p> */}
      <form className={styles.chatPasswordInput} onSubmit={passwordHandler}>
        <ChatPasswordInput passwordRef={passwordRef} />
        <button className={styles.submitPassword}>
          <Image src={submitMessage} alt={'submit message'} width={30} />
        </button>
      </form>
    </div>
  )
}

export default ChatPassword
