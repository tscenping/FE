import Image from 'next/image'
import styles from './LoginPageContents.module.scss'
import logo from '../../public/img/login/logo.svg'
import stick from '../../public/img/login/stick.svg'
import LoginButton from './LoginButton/LoginButton'

interface LoginPageContentsProps {
  state: boolean
}

function LoginPageContents(props: LoginPageContentsProps): JSX.Element {
  return (
    <div className={styles.loginPageContents}>
      <ul className={styles.loginPageContentsContainer}>
        <li className={styles.logo}>
          <Image src={logo} alt={'logo'} width={300} height={300} />
          <Image src={stick} alt={'logo stick'} width={80} height={80} />
        </li>
        <LoginButton content="42" />
        <LoginButton content="google" />
      </ul>
      <div className={styles.pingpong}></div>
    </div>
  )
}

export default LoginPageContents
