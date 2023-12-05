import PageTitle from '@/components/UI/PageTitle'
import styles from './rank.module.scss'
import Pagination from 'react-js-pagination'
import { useEffect, useState } from 'react'
import CustomPagination from '@/components/Pagination/CustomPagination'
import RankUserList from '@/components/Rank/RankUserList'
import { instance } from '@/util/axios'

interface RankInfo {
  rankUsers: RankUsers[]
  totalItemCount: number
}
interface RankUsers {
  nickname: string
  avatar: string
  ladderScore: number
  ranking: number
}

export default function Rank() {
  const [page, setPage] = useState(1)
  const [rankData, setRankData] = useState<RankInfo>()
    const getRankListHandler = async () => {
    try {
      await instance
        .get(
          `/users/rank/?page=${page}`,
          { withCredentials: true },
        )
        .then(function (res) {
          console.log(res)
          setRankData(res.data)
        })
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    console.log(page)
    getRankListHandler()  

  }, [page]) // 여기에 api호출 넣으면 될듯~

  return (
    <div className={styles.backGround}>
      <PageTitle title="Rank" subTitle="다른 유저와의 경쟁을 통해서 랭킹을 올려보세요." />
      <section className={styles.rankList}>
        {rankData && rankData.rankUsers.map((rankUser, index) => (
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
        { rankData && rankData.totalItemCount > 10 && <CustomPagination
          page={page}
          setPage={setPage}
          itemsCountPerPage={10}
          totalItemsCount={rankData.totalItemCount}
        />}
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
