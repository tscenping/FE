import styles from './UserProfileModal.module.scss'
import profileImage from '@/public/img/mypage/profileImage.svg'
import closeBtn from '@/public/img/modal/modalClose.svg'
import friendEdit from '@/public/img/modal/friendEdit.svg'
import Image from 'next/image'
import { useModalState } from '@/store/store'
import MyPageHistory from '@/components/MyPage/MyPageHistory'

interface MatchHistoryProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number
  myScore: number
  isWinner: boolean
}

export default function UserProfile() {
  const { modalName, setModalName } = useModalState()

  const gameHistories: MatchHistoryProps[] = [
    {
      rivalName: 'sangyeki',
      rivalAvatar: '',
      rivalScore: 3,
      myScore: 5,
      isWinner: false,
    },
    {
      rivalName: 'sangyeki',
      rivalAvatar: '',
      rivalScore: 3,
      myScore: 5,
      isWinner: true,
    },  
    {
      rivalName: 'sangyeki',
      rivalAvatar: '',
      rivalScore: 3,
      myScore: 5,
      isWinner: true,
    },
    {
      rivalName: 'sangyeki',
      rivalAvatar: '',
      rivalScore: 3,
      myScore: 5,
      isWinner: false,
    },
    {
      rivalName: 'sangyeki',
      rivalAvatar: '',
      rivalScore: 3,
      myScore: 5,
      isWinner: true,
    },
  ]
  return (
    <div className={styles.backGround}>
      <div>
        <section className={styles.userProfile}>
          <button
            onClick={() => setModalName(null)}
            className={styles.closeBtn}
          >
            <Image
              src={closeBtn}
              alt={'closeBtn'}
              width={30}
            />
          </button>
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
          <section className={styles.recentHistory}>
            <div className={styles.recentHistoryTitle}>
              <div className={styles.divideLine}></div>최 근 전 적
              <div className={styles.divideLine}></div>
            </div>
            <div className={styles.historyList}>
            <MyPageHistory gameHistories={gameHistories} />
            </div>
          </section>
        </section>
      </div>
      <section className={styles.pagenation}>
        {'<'}- 1 2 3 4 5 -{'>'}
      </section>
    </div>
  )
}
