import { RefObject } from 'react'
import styles from './PasswordInput.module.scss'
import { useSettingRoomNavBarState } from '@/store/chat'

interface PasswordInputProps {
  passwordRef: RefObject<HTMLInputElement>
}

function PasswordInput(props: PasswordInputProps): JSX.Element {
  const { settingTabState } = useSettingRoomNavBarState()

  const inputStyles = settingTabState === 'PUBLIC' ? styles.block : styles.nonBlock

  const passwordHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.passwordRef.current) {
      props.passwordRef.current.value = e.target.value
    }
  }

  return (
    <section className={styles.chatPassword}>
      <label htmlFor="inputPassword">Password</label>
      <input
        type="password"
        className={inputStyles}
        maxLength={16}
        placeholder={settingTabState === 'PUBLIC' ? '' : 'If you want a password, please enter it'}
        ref={props.passwordRef}
        id="inputPassword"
        onChange={passwordHandleChange}
        disabled={settingTabState === 'PUBLIC'}
      ></input>
    </section>
  )
}

export default PasswordInput
