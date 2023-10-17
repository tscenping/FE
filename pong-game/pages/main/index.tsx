import Image from 'next/image'
import notice from '../../public/img/layout/notice.svg'
import styles from '../../styles/main/index.module.scss'
import Sidebar from '@/components/layout/sidebar'

export default function Home() {
  return (
    <div>
      <Sidebar/>
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
      
    </div>
  )
}
