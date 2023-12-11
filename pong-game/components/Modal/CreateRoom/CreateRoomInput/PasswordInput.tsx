import { RefObject, useState } from 'react'
import styles from './PasswordInput.module.scss'

interface PasswordInputProps {
  passwordRef: RefObject<HTMLInputElement>
  tabState: string
}

function PasswordInput(props: PasswordInputProps): JSX.Element {
  const [password, setPassword] = useState('')

  const passwordHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (props.passwordRef.current) {
      props.passwordRef.current.value = e.target.value
    }
  }

  return (
    <>
      {props.tabState === 'publicOrProtected' && (
        <section className={styles.chatPassword}>
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className={styles.chatPasswordInput}
            maxLength={16}
            placeholder="If you want a password, please enter it"
            ref={props.passwordRef}
            id="inputPassword"
            onChange={passwordHandleChange}
          ></input>
        </section>
      )}
    </>
  )
}

export default PasswordInput
