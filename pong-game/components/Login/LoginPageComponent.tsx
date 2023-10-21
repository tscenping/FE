import LoginPageTitle from './LoginPageTitle'
import LoginPageContents from './LoginPageContents'
import InputNickImage from './InputNickImage'
import styles from '../../styles/components/Login/LoginPageComponent.module.css'

function LoginPageComponent(): JSX.Element {
  return (
    <div className={styles.loginPageComponent}>
      <LoginPageTitle />
      {/* <LoginPageContents /> */}
      <InputNickImage />
    </div>
  )
}

export default LoginPageComponent
