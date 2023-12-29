import PageTitle from '@/components/UI/PageTitle'
import styles from './mypage.module.scss'
import React, { useEffect, useState } from 'react'
import MyPageHistory from '@/components/MyPage/MyPageHistory'
import MyPageProfile from '@/components/MyPage/MyPageProfile'
import CustomPagination from '@/components/Pagination/CustomPagination'
import https from 'https'
import axios from 'axios'
import cookie from 'cookie'
import { instance } from '@/util/axios'
import { useNickNameImage } from '@/store/login'

interface GameHistoryContents {
  rivalname: string
  rivalavatar: string
  rivalscore: number
  myscore: number
  iswinner: boolean
}

interface GameHistoryProps {
  gameHistories: GameHistoryContents[]
  totalItemCount: number
}

interface MyPageProfileProps {
  nickname: string
  avatar: string
  statusMessage: string
  loseCount: number
  winCount: number
  totalCount: number
  ladderRank: number
  ladderScore: number
  ladderMaxScore: number
}

export default function Mypage(props) {
  const [page, setPage] = useState(1)
  const [gameHistories, setGameHistories] = useState<GameHistoryProps>()
  const [userProfile, setUserProfile] = useState<MyPageProfileProps>(null)
  const { myNickname, setAvatar } = useNickNameImage()
  const getGameHistoryHandler = async () => {
    try {
      if (props.data.nickname) {
        await instance
          .get(`/users/games/${props.data.nickname}/?page=${page}`, {})
          .then(function (res) {
            setGameHistories(res.data)
            console.log(res.data)
          })
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  // const getUserProfileHandler = async () => {
  //   await instance.get(`/users/me`, {}).then(function (res) {
  //     setUserProfile(res.data)
  //   })
  // }

  useEffect(() => {
    setUserProfile(props.data)
    getGameHistoryHandler()
    setAvatar(props.data.avatar)
  }, [page, setAvatar, props.data])

  // useEffect(() => {
  //   getUserProfileHandler
  // }, [])

  return (
    <div className={styles.backGround}>
      <PageTitle
        title="MyPage"
        subTitle="프로필 사진, 상태메세지 변경과 내 전적을 확인할 수 있어요."
      />
      {/* serverSide 데이터 페칭으로 한 데이터 props로 전달 */}
      {userProfile && (
        <>
          <MyPageProfile
            nickName={userProfile.nickname}
            avatar={userProfile.avatar}
            statusMessage={userProfile.statusMessage}
            loseCount={userProfile.loseCount}
            winCount={userProfile.winCount}
            totalCount={userProfile.totalCount}
            ladderRank={userProfile.ladderRank}
            ladderScore={userProfile.ladderScore}
            ladderMaxScore={userProfile.ladderMaxScore}
          />
          <section className={styles.history}>
            <div className={styles.historyList}>
              {gameHistories && (
                <MyPageHistory
                  gameHistories={gameHistories.gameHistories}
                  totalItemsCount={gameHistories.totalItemCount}
                />
              )}
            </div>
            <div className={styles.pagenation}>
              {gameHistories && gameHistories.totalItemCount > 5 && (
                <CustomPagination
                  page={page}
                  setPage={setPage}
                  itemsCountPerPage={5}
                  totalItemsCount={gameHistories.totalItemCount}
                />
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const mycookie = cookie.parse((context.req && context.req.headers.cookie) || '')

  if (!Object.keys(mycookie).length) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    }
  } else {
    const accessToken = mycookie.accessToken
    const refreshToken = mycookie.refreshToken

    const header = {
      'Content-Type': 'application/json',
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    }

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
    try {
      const response = await instance('https://localhost:3000/users/me', {
        method: 'get',
        headers: header,
      })
      return { props: { data: response.data } }
    } catch (e) {
      console.log(e.message)
    }
  }
}
