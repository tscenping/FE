import PageTitle from '@/components/UI/PageTitle'
import Layout from '@/components/layout/Layout'
import styles from '../../styles/mypage/mypage.module.scss'
import React from 'react'

export default function Mypage() {
  return (
    <Layout>
      <div className={styles.backGround}>
        <PageTitle
          title="MyPage"
          subTitle="프로필 사진, 상태메세지 변경과 내 전적을 확인할 수 있어요."
        />
        <section className={styles.userProfile}>
          <section className={styles.lineOne}>
            <div className={styles.profileNickName}>
              <div>1</div>
              <div>2</div>
            </div>
            <div className={styles.}>3</div>
          </section>
          <section className={styles.lineTwo}>
            <div>1</div>
            <div>2</div>
          </section>
          <section className={styles.lineThree}>1</section>
        </section>
      </div>
    </Layout>
  )
}
