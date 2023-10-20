import PageTitle from '@/components/UI/PageTitle'
import styles from '../../styles/rank/rank.module.scss'
import profileImage from '../../public/img/mypage/profileImage.svg'
import Image from 'next/image'

export default function Rank() {
  return (
    <div className={styles.backGround}>
      <PageTitle
        title="Rank"
        subTitle="다른 유저와의 경쟁을 통해서 랭킹을 올려보세요."
      />
      <section className={styles.rankList}>
        <div className={styles.rankContent}>
          <div className={styles.userInfo}>
            <span className={styles.rank}>10. </span>
            <span className={styles.userName}>
              <Image
                src={profileImage}
                alt={'profileImage'}
                // className={styles.radioImg}
                width={64}
                // height={40}
              />
              abcdabcdab
            </span>
          </div>
          <div className={styles.score}>4242</div>
        </div>
        <div className={styles.rankContent}>
          <div className={styles.userInfo}>
            <span className={styles.rank}>10. </span>
            <span className={styles.userName}>
              <Image
                src={profileImage}
                alt={'profileImage'}
                // className={styles.radioImg}
                width={64}
                // height={40}
              />
              abcdabcdab
            </span>
          </div>
          <div className={styles.score}>4242</div>
        </div>
        
      </section>
      <section className={styles.pagenation}>- 1 2 3 4 5 -</section>
    </div>
  )
}
