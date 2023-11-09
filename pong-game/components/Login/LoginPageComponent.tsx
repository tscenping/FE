import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

import LoginPageTitle from './LoginPageTitle'
import LoginPageContents from './LoginPageContents'
import InputNickImage from './InputNickImage'
import styles from './LoginPageComponent.module.scss'
import { useRouter } from 'next/router'

function LoginPageComponent(): JSX.Element {
  const [input, setInput] = useState<boolean>(true)

  const router = useRouter()
  console.log(router.query.code)

  return (
    <div className={styles.loginPageComponent}>
      <LoginPageTitle />
      {input ? <LoginPageContents state={input} /> : <InputNickImage state={input} />}
    </div>
  )
}

export default LoginPageComponent
