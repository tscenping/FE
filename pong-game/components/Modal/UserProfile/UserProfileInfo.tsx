import Image from 'next/image'
import styles from './UserProfileInfo.module.scss'
import profileImage from '@/public/img/mypage/profileImage.svg'
import friendEdit from '@/public/img/modal/friendEdit.svg'

export default function UserProfileInfo() {
  return (
    <>
              <section className={styles.lineOne}>
            <div className={styles.profileNickName}>
              <div className={styles.profileImg}>
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  width={80}
                />
              </div>
              <div className={styles.nickName}>abcdefghi</div>
              <Image
                src={friendEdit}
                alt={'friendEdit'}
                width={30}
              />
            </div>
          </section>
          <section className={styles.lineTwo}>상태메세지</section>
    <section className={styles.lineThree}>
      <div className={styles.lineThreeSub}>
        <div className={styles.lineThreeContent}>
          <span className={styles.recordText}>랭킹</span>
          <br />
          <span className={styles.recordText}>1</span>
        </div>
        <div className={styles.lineThreeContent}>
          <span className={styles.recordText}>래더점수</span>
          <br />
          <span className={styles.recordText}>12s34</span>
        </div>
        <div className={styles.lineThreeContent}>
          <span className={styles.recordText}>최고점수</span>
          <br />
          <span className={styles.recordText}>5678</span>
        </div>
      </div>
      <div className={styles.lineThreeSub}>
        <div className={styles.lineThreeContent}>
          <span className={styles.recordText}>통계</span>
          <br />
          <span className={styles.recordText}>500전 300승 200패</span>
        </div>
      </div>
    </section>
    </>
  )
}
