import PageTitle from '@/components/UI/PageTitle'
import styles from './rank.module.scss'
import { useEffect, useState } from 'react'
import CustomPagination from '@/components/Pagination/CustomPagination'
import RankUserList from '@/components/Rank/RankUserList'
import axios from 'axios'
import https from 'https'

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

export default function Rank(props) {
  const [page, setPage] = useState(1)
  const [rankData, setRankData] = useState<RankInfo>(props.data)
  const [paginatedRankUsers, setPaginatedRankUsers] = useState<RankUsers[]>(
    props.data.rankUsers.slice(0, 10),
  )
  // console.log(props.data)
  // useEffect(() => {}, [])
  // const getRankListHandler = async () => {
  //   try {
  //     await instance
  //       .get(`/users/rank/?page=${page}`, { withCredentials: true })
  //       .then(function (res) {
  //         console.log(res)
  //         setRankData(res.data)
  //       })
  //   } catch (e) {
  //     console.log(e.message)
  //   }
  // }
  useEffect(() => {
    setPaginatedRankUsers(props.data.rankUsers.slice((page - 1) * 10, page * 10))
    // console.log(rankData.totalItemCount)
  }, [page]) // 여기에 api호출 넣으면 될듯~

  return (
    <div className={styles.backGround}>
      <PageTitle title="Rank" subTitle="다른 유저와의 경쟁을 통해서 랭킹을 올려보세요." />
      <section className={styles.rankList}>
        {paginatedRankUsers &&
          paginatedRankUsers.map((rankUser, index) => (
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
        {rankData && rankData.totalItemCount > 10 && (
          <CustomPagination
            page={page}
            setPage={setPage}
            itemsCountPerPage={10}
            totalItemsCount={rankData.totalItemCount}
          />
        )}
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

export const getStaticProps = async () => {
  const header = {
    'Content-Type': 'application/json',
  }
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  })
  try {
    const response = await instance({
      url: 'https://localhost:3000/users/rank',
      method: 'get',
      headers: header,
    })
    return { props: { data: response.data }, revalidate: 30 }
  } catch (e) {
    console.log(e.message)
  }
}
