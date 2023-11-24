import LoginPageTitle from './LoginPageTitle'
import LoginPageContents from './LoginPageContents'
import InputNickImage from './InputNickImage'
import styles from './LoginPageComponent.module.scss'
import { useRouter } from 'next/router'

function LoginPageComponent(): JSX.Element {
  // const [input, setInput] = useState<boolean>(false)

  const router = useRouter()
  

  return (
    <div className={styles.loginPageComponent}>
      <LoginPageTitle />
      {router.pathname === '/login' ? <LoginPageContents /> : <InputNickImage />}
    </div>
  )
}

export default LoginPageComponent
