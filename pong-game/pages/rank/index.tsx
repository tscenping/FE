import PageTitle from '@/components/UI/PageTitle'
import styles from '../../styles/rank/Rank.module.scss'
import profileImage from '../../public/img/mypage/profileImage.svg'
import Image from 'next/image'
import DropDown from '@/components/dropDown/DropDown'
import { useModalState, useUserProfileModalState } from '@/store/store'

export default function Rank() {
  const { modalName, setModalName } = useModalState()
  return (
    <div className={styles.backGround}>
      <PageTitle
        title="Rank"
        subTitle="다른 유저와의 경쟁을 통해서 랭킹을 올려보세요."
      />

      <section className={styles.rankList}>
        <div className={styles.rankContent}>
          <div
            className={styles.userInfo}
            onClick={() => {
              setModalName('userProfile')
              console.log(modalName)
            }}
          >
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
              {/* <DropDown
                isDropDownView={true}
                dropDownState="userProfile"
                userProfile={{ isFriend: true, isBlock: false }}
              /> */}
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
              <DropDown
                isDropDownView={true}
                dropDownState="userProfile"
                userProfile={{ isFriend: true, isBlock: false }}
              />
            </span>
          </div>

          <div className={styles.score}>4242</div>
        </div>
      </section>

      <section className={styles.pagenation}>- 1 2 3 4 5 -</section>
    </div>
  )
}
