import Image from 'next/image'
import styles from './LoginButton.module.scss'
import loginGoogleButton from '@/public/img/login/google.svg'
import login42Button from '@/public/img/login/42.svg'
import Link from 'next/link'

interface LoginButtonProps {
  content: string
}

function LoginButton({ content }: LoginButtonProps): JSX.Element {
  const icon = content === 'google' ? loginGoogleButton : login42Button
  //   const icon2:{[key:string]:JSX.Element | null} = {
  //     'google': <button className={styles.loginGoogleButton}/>,
  //     '42': <button className={styles.login42Button}/>,
  //   }

  return (
    <li className={styles.loginButton}>
      <Link href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-d9692dbade8cb4303d270d1ec51af232af123dd53aec7470bfa64921bdc6ccdc&redirect_uri=https%3A%2F%2Flocalhost%3A8001%2Flogin&response_type=code">
        <button className={content === 'google' ? styles.loginGoogleButton : styles.login42Button}>
          <Image src={icon} alt={content} />
          {icon === login42Button ? '42' : 'Google'} Login
        </button>
      </Link>
    </li>
  )
}

export default LoginButton
