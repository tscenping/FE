import { RefObject } from 'react'
import styles from './ChatpasswordInput.module.scss'

interface ChatPasswordInputProps {
  passwordRef: RefObject<HTMLInputElement>
}

function ChatPasswordInput(props: ChatPasswordInputProps): JSX.Element {
  return (
    <>
      <input
        type="password"
        className={styles.passwordInput}
        ref={props.passwordRef}
        required
        maxLength={16}
      />
      <span className={styles.passwordInputPlaceHolder}>비밀번호를 입력해주세요.</span>
    </>
  )
}

export default ChatPasswordInput
