import styles from './UserProfileModal.module.scss'
import profileImage from '@/public/img/mypage/profileImage.svg'
import closeBtn from '@/public/img/modal/modalClose.svg'
import friendEdit from '@/public/img/modal/friendEdit.svg'
import Image from 'next/image'
import { useModalState } from '@/store/store'
import MyPageHistory from '@/components/MyPage/MyPageHistory'
import CustomPagination from '@/components/pagination/CustomPagination'
import UserProfileInfo from './UserProfileInfo'

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
            <Image src={closeBtn} alt={'closeBtn'} width={30} />
          </button>
          <UserProfileInfo />
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
        <CustomPagination totalItemsCount={10} itemsCountPerPage={5} />
      </section>
    </div>
  )
}
