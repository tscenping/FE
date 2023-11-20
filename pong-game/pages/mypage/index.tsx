import PageTitle from '@/components/UI/PageTitle'
import styles from './mypage.module.scss'
import React, { useEffect, useState } from 'react'
import MyPageHistory from '@/components/MyPage/MyPageHistory'
import MyPageProfile from '@/components/MyPage/MyPageProfile'
import CustomPagination from '@/components/Pagination/CustomPagination'

interface MatchHistoryProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number
  myScore: number
  isWinner: boolean
}
interface pageInfo {
  requestPage: number
  totalPage: number
  totalDateSize: number
}

interface MyPageProfileProps {
  nickName: string
  avatar: string
  statusMessage: string
  loseCount: number
  winCount: number
  totalCount: number
  ladderRank: number
  ladderScore: number
  ladderMaxScore: number
  gameInfo?: {
    gameHistories: MatchHistoryProps[]
    pageInfo: pageInfo
  }
}

export default function Mypage() {
  const [page, setPage] = useState(1)
  useEffect(() => {
    console.log(page)
  }, [page]) // api넣으면 될듯~
  var props: MyPageProfileProps = {
    nickName: 'abcdefghhhhh',
    avatar: 'hhh',
    statusMessage: 'asdasdasdasdsadasdas',
    loseCount: 123,
    winCount: 123,
    totalCount: 246,
    ladderRank: 2,
    ladderScore: 1234,
    ladderMaxScore: 2345,
  }

  const pageInfo: pageInfo = {
    requestPage: 1, // 유저가 보고싶은 현재 페이지
    totalPage: 10, // 전체 데이터 수 / 각 페이지별 데이터 개수
    totalDateSize: 89, // 전체 데이터 개수
  }
  const gameHistories: MatchHistoryProps[] = [
    {
      rivalName: 'abcdefghhhh',
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
    // {
    //   rivalName: 'sangyeki',
    //   rivalAvatar: '',
    //   rivalScore: 3,
    //   myScore: 5,
    //   isWinner: true,
    // },
    // {
    //   rivalName: 'sangyeki',
    //   rivalAvatar: '',
    //   rivalScore: 3,
    //   myScore: 5,
    //   isWinner: true,
    // },
  ]
  return (
    <div className={styles.backGround}>
      <PageTitle
        title="MyPage"
        subTitle="프로필 사진, 상태메세지 변경과 내 전적을 확인할 수 있어요."
      />
      <MyPageProfile
        nickName={'him'}
        avatar={'hhh'}
        statusMessage={'asdasdasdasdsadasdas'}
        loseCount={123}
        winCount={123}
        totalCount={246}
        ladderRank={2}
        ladderScore={1234}
        ladderMaxScore={2345}
      />
      <section className={styles.history}>
        <div className={styles.historyList}>
          <MyPageHistory gameHistories={gameHistories} />
        </div>
        <div className={styles.pagenation}>
          <CustomPagination
            page={page}
            setPage={setPage}
            itemsCountPerPage={5}
            totalItemsCount={pageInfo.totalDateSize}
          />
        </div>
      </section>
    </div>
  )
}
