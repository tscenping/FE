import PageTitle from '@/components/UI/PageTitle'
import Layout from '@/components/layout/Layout'
import styles from './mypage.module.scss'
import profileImage from '@/public/img/mypage/profileImage.svg'
import textEditBtn from '@/public/img/mypage/textEdit.svg'
import React from 'react'
import Image from 'next/image'

export default function Mypage() {
  return (
    <>
      <div className={styles.backGround}>
        <PageTitle
          title="MyPage"
          subTitle="프로필 사진, 상태메세지 변경과 내 전적을 확인할 수 있어요."
        />
        <section className={styles.userProfile}>
          <section className={styles.lineOne}>
            <div className={styles.profileNickName}>
              <div className={styles.profileImg}>
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={80}
                  // height={40}
                />
              </div>
              <div className={styles.nickName}>abcdefghi</div>
            </div>
            <div className={styles.profileMessage}>
              <div className={styles.text}>
                asdasdasasdzxccxzxczadsadsasdadsczxxzcczxadsasdasd3
              </div>
              <Image
                src={textEditBtn}
                alt={'textEditBtn'}
                className={styles.textEditBtn}
                width={30}
                // height={40}
              />
            </div>
          </section>
          <section className={styles.lineTwo}>
            <div className={styles.secondAuth}>2차 인증</div>
            <div className={styles.record}>
              300전&nbsp;&nbsp;&nbsp;200승&nbsp;&nbsp;&nbsp;100패
            </div>
          </section>
          <section className={styles.lineThree}>
            <div>
              <span className={styles.rankTitle}>랭킹</span>
              <br />
              <span className={styles.rankSubTitle}>1</span>
            </div>
            <div>
              <span className={styles.rankTitle}>래더점수</span>
              <br />
              <span className={styles.rankSubTitle}>1234</span>
            </div>
            <div>
              <span className={styles.rankTitle}>최고점수</span>
              <br />
              <span className={styles.rankSubTitle}>5678</span>
            </div>
          </section>
        </section>
        <section className={styles.history}>
          <div className={styles.historyList}>
            <section className={styles.historyContent}>
              <div className={styles.result}>Win</div>
              <div className={styles.leftUser}>
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
                him
              </div>
              <div className={styles.score}>7 : 2</div>
              <div className={styles.rightUser}>
                sangyeki
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
              </div>
              <div className={styles.result}>Win</div>
            </section>
            <section className={styles.historyContent}>
              <div className={styles.result}>Win</div>
              <div className={styles.leftUser}>
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
                him
              </div>
              <div className={styles.score}>7 : 2</div>
              <div className={styles.rightUser}>
                sangyeki
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
              </div>
              <div className={styles.result}>Win</div>
            </section>
            <section className={styles.historyContent}>
              <div className={styles.result}>Win</div>
              <div className={styles.leftUser}>
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
                him
              </div>
              <div className={styles.score}>7 : 2</div>
              <div className={styles.rightUser}>
                sangyeki
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
              </div>
              <div className={styles.result}>Win</div>
            </section>
            <section className={styles.historyContent}>
              <div className={styles.result}>Win</div>
              <div className={styles.leftUser}>
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
                him
              </div>
              <div className={styles.score}>7 : 2</div>
              <div className={styles.rightUser}>
                sangyeki
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
              </div>
              <div className={styles.result}>Win</div>
            </section>
            <section className={styles.historyContent}>
              <div className={styles.result}>Win</div>
              <div className={styles.leftUser}>
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
                him
              </div>
              <div className={styles.score}>7 : 2</div>
              <div className={styles.rightUser}>
                sangyeki
                <Image
                  src={profileImage}
                  alt={'profileImage'}
                  // className={styles.radioImg}
                  width={64}
                  // height={40}
                />
              </div>
              <div className={styles.result}>Win</div>
            </section>
          </div>
          <section className={styles.pagenation}>- 1 2 3 4 5 -</section>
        </section>
      </div>
    </>
  )
}
