import PageTitle from '@/components/UI/PageTitle'
import styles from './rank.module.scss'
import Pagination from 'react-js-pagination'
import { useEffect, useState } from 'react'
import CustomPagination from '@/components/Pagination/CustomPagination'
import RankUserList from '@/components/Rank/RankUserList'

interface RankInfo {
  rankUsers: RankUsers[]
  totalDataSize: number
}
interface RankUsers {
  nickname: string
  avatar: string
  ladderScore: number
  ranking: number
}

export default function Rank() {
  const rankDummyData: RankInfo = {
    rankUsers: [
      {
        nickname: 'User1',
        avatar: 'avatar1.jpg',
        ladderScore: 1000,
        ranking: 1,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 2,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 3,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 4,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 5,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 6,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 7,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 8,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 9,
      },
      {
        nickname: 'User2',
        avatar: 'avatar2.jpg',
        ladderScore: 950,
        ranking: 10,
      },
    ],
    totalDataSize: 20,
  }
  const [page, setPage] = useState(1)
  useEffect(() => {
    console.log(page)
  }, [page]) // 여기에 api호출 넣으면 될듯~

  return (
    <div className={styles.backGround}>
      <PageTitle title="Rank" subTitle="다른 유저와의 경쟁을 통해서 랭킹을 올려보세요." />
      <section className={styles.rankList}>
        {rankDummyData.rankUsers.map((rankUser, index) => (
          <RankUserList
            key={index}
            nickname={rankUser.nickname}
            avatar={rankUser.avatar}
            ladderScore={rankUser.ladderScore}
            ranking={rankUser.ranking}
          />
        ))}
      </section>

      <section className={styles.page}>
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={rankDummyData.totalDataSize}
        />
        {/* 
                useEffect에 setContent 를 넣어두고
                Pagination컴포넌트 통해서 page벨류가 변경되면
                setContent가 호출되고
                JSX리턴에 content를 map을 통해 보여준다.
               */}
      </section>
    </div>
  )
}
