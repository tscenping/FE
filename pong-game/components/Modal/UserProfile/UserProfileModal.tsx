import styles from './UserProfileModal.module.scss'
import closeBtn from '@/public/img/modal/modalClose.svg'
import Image from 'next/image'
import { useModalState } from '@/store/store'
import MyPageHistory from '@/components/MyPage/MyPageHistory'
import CustomPagination from '@/components/pagination/CustomPagination'
import UserProfileInfo from './UserProfileInfo'
import { useEffect, useState } from 'react'

interface MatchHistoryProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number
  myScore: number
  isWinner: boolean
}

interface UserProfileProps {
  id: number
  nickname: string
  avatar: string
  statusMessage: string
  loseCount: number
  winCount: number
  totalCount: number
  ladderRank: number
  ladderScore: number
  ladderMaxScore: number
  gameHistories: MatchHistoryProps[]
  isFriend: boolean
  isBlocked: boolean
}

export default function UserProfile() {
  const { setModalName } = useModalState()
  const { modalProps } = useModalState()
  const [page, setPage] = useState(1)

  const userProfileProps = {
    id: 1,
    nickname: modalProps.nickname,
    avatar: 'avatar-url',
    statusMessage: 'Hello, World!',
    loseCount: 5,
    winCount: 10,
    totalCount: 15,
    ladderRank: 3,
    ladderScore: 1200,
    ladderMaxScore: 1300,
    isFriend: true,
    isBlocked: false,
  }

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
          <button onClick={() => setModalName(null)} className={styles.closeBtn}>
            <Image src={closeBtn} alt={'closeBtn'} width={30} />
          </button>
          <UserProfileInfo userProfileProps={userProfileProps} />
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
        <CustomPagination page={page} setPage={setPage} totalItemsCount={5} itemsCountPerPage={5} />
      </section>
    </div>
  )
}
