import styles from './DuplicateLogin.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'

function DuplicateLogin(): JSX.Element {
  return (
    <div className={styles.duplicateLoginConatainer}>
      <ModalPageTitle title={'중복 로그인'} subTitle="" />
      <section className={styles.duplicateExplanation}>
        <strong>
          이미 다른 곳에서 로그인된 유저는 <br />
          중복 로그인이 불가능합니다.
        </strong>
      </section>
    </div>
  )
}

export default DuplicateLogin
