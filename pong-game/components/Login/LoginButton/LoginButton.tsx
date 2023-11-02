import Image from 'next/image'
import styles from './LoginButton.module.scss'
import loginGoogleButton from '@/public/img/login/google.svg'
import login42Button from '@/public/img/login/42.svg'

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
      <button className={content === 'google' ? styles.loginGoogleButton : styles.login42Button}>
        <Image src={icon} alt={content} />
        {icon === login42Button ? '42' : 'Google'} Login
      </button>
    </li>
  )
}

export default LoginButton
