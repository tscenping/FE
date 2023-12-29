import styles from './ModalPageTitle.module.scss'

interface ModalPageTitleProps {
  title: string
  subTitle: string
}

function ModalPageTitle(props: ModalPageTitleProps): JSX.Element {
  return (
    <header className={styles.modalHeaderContainer}>
      <h1 className={styles.title}>{props.title}</h1>
      <h2 className={styles.subTitle}>{props.subTitle}</h2>
    </header>
  )
}

export default ModalPageTitle
