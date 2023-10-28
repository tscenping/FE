import Image from 'next/image'
import styles from './PageTitle.module.css'
import prvBtn from '../../public/img/pageNation/left.svg'

interface TitleData {
  title: string
  subTitle: string
  prvBtn?: boolean
  handlePrvBtn?: () => void
}

function PageTitle(props: TitleData): JSX.Element {
  return (
    <div className={styles.titleContainer}>
      {props.prvBtn == true && (
        <Image
          src={prvBtn}
          alt={'prvBtn'}
          className={styles.prvBtn}
          width={64}
          onClick={props.handlePrvBtn}
        />
      )}
      <div className={styles.mainTitle}>
        <h1 className={styles.title}>{props.title}</h1>
      </div>
      <h3 className={styles.subTitle}>{props.subTitle}</h3>
    </div>
  )
}

export default PageTitle
