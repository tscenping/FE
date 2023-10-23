import Image from 'next/image'
import styles from '../../styles/components/Login/LoginPageContents.module.css'
import logo from '../../public/img/login/logo.svg'
import stick from '../../public/img/login/stick.svg'
import loginGoogle from '../../public/img/login/google.svg'
import login42 from '../../public/img/login/42.svg'

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
        <li>
          <button className={styles.login42Button}>
            <Image src={login42} alt={'42 login button'} />
            42 Login
          </button>
        </li>
        <li>
          <button className={styles.loginGoogleButton}>
            <Image src={loginGoogle} alt={'google login button'} />
            Google Login
          </button>
        </li>
      </ul>
      <div className={styles.pingpong}></div>
    </div>
  )
}

export default LoginPageContents
