import { useState } from 'react'

import LoginPageTitle from './LoginPageTitle'
import LoginPageContents from './LoginPageContents'
import InputNickImage from './InputNickImage'
import styles from '../../styles/components/Login/LoginPageComponent.module.css'

function LoginPageComponent(): JSX.Element {
  const [input, setInput] = useState<boolean>(true)
  return (
    <div className={styles.loginPageComponent}>
      <LoginPageTitle />
      {input ? (
        <LoginPageContents state={input} />
      ) : (
        <InputNickImage state={input} />
      )}
    </div>
  )
}

export default LoginPageComponent
