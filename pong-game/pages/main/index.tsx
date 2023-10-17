import Image from 'next/image'
import notice from '../../public/img/layout/notice.svg'
import styles from '../../styles/main/index.module.scss'
import Layout from '@/components/layout/Layout'

export default function Home() {
  return (
    <Layout>
      <div>
        <div className={styles.title}>
          <h1 className={styles.mainTitle}>Game Start</h1>
          <div className={styles.subTitle}>
            일반게임과 래더게임 중 하나를 선택해주세요.
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        <button className={styles.gameBtn}>Ladder</button>
        <button className={styles.gameBtn}>Normal</button>
      </div>
    </Layout>
  )
}
