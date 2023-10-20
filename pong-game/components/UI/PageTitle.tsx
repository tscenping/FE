import styles from '../../styles/components/UI/PageTitle.module.css'

interface TitleData {
  title: string
  subTitle: string
}

function PageTitle(props: TitleData): JSX.Element {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{props.title}</h1>
      <h3 className={styles.subTitle}>{props.subTitle}</h3>
    </div>
  )
}

export default PageTitle
