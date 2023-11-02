import Image from 'next/image'
import lock from '@/public/img/chat/lock.svg'
import submitMessage from '@/public/img/chat/enterInput.svg'
import styles from './ChatPassword.module.scss'

function ChatPassword(): JSX.Element {
  return (
    <div className={styles.chatPassword}>
      <div className={styles.chatRoomName}>
        <Image src={lock} alt={'password room'} />
        <h1 className={styles.RoomName}>채팅방 이름</h1>
      </div>
      {/* <p className={styles.wrongPassword}>잘못된 비밀번호 입니다.</p> */}
      <div className={styles.chatPasswordInput}>
        <input type="password" className={styles.passwordInput} required />
        <span className={styles.passwordInputPlaceHolder}>비밀번호를 입력해주세요.</span>
        <button className={styles.submitPassword}>
          <Image src={submitMessage} alt={'submit message'} width={30} />
        </button>
      </div>
    </div>
  )
}

export default ChatPassword
