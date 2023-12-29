import styles from './UserProfileModal.module.scss'
import closeBtn from '@/public/img/modal/modalClose.svg'
import Image from 'next/image'
import { useModalState, useResponseModalState } from '@/store/store'
import MyPageHistory from '@/components/MyPage/MyPageHistory'
import CustomPagination from '@/components/Pagination/CustomPagination'
import UserProfileInfo from './UserProfileInfo'
import { useEffect, useState, useCallback } from 'react'
import { instance } from '@/util/axios'
import { useErrorCheck } from '@/store/login'

interface GameHistoryContents {
  rivalname: string
  rivalavatar: string
  rivalscore: number
  myscore: number
  iswinner: boolean
}

interface GameHistoryProps {
  gameHistories: GameHistoryContents[]
  totalItemsCount: number
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
  isFriend: boolean
  isBlocked: boolean
}

export default function UserProfile() {
  const { setModalName, modalProps } = useModalState()
  const [userNickname, setUserNickname] = useState<string>()
  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileProps>()
  const [page, setPage] = useState(1)
  const [gameHistories, setGameHistories] = useState<GameHistoryProps>()
  const responseModal = useResponseModalState()
  const { setApiError } = useErrorCheck()

  const getUserProfileHandler = useCallback(async () => {
    try {
      if (userNickname === undefined) return
      await instance.get(`/users/profile/${userNickname}`, {}).then(function (res) {
        setUserProfileInfo(res.data)
        console.log(res)
      })
    } catch (e) {
      // alert('존재하지 않는 유저입니다.')
      if (e && e.response.status === 401) setApiError(401)
      setModalName('response')
      responseModal.setResponseModalState('알림', '잘못된 접근입니다.', null)
    }
  }, [responseModal, setModalName, userNickname, setApiError])

  const getGameHistoryHandler = useCallback(async () => {
    try {
      if (userNickname === undefined) return
      await instance.get(`/users/games/${userNickname}/?page=${page}`, {}).then(function (res) {
        setGameHistories(res.data)
        console.log(res.data)
      })
    } catch (e) {
      // alert('존재하지 않는 유저입니다.')
      if (e && e.response.status === 401) setApiError(401)
      setModalName('response')
      responseModal.setResponseModalState('알림', '잘못된 접근입니다.', null)
    }
  }, [page, responseModal, setModalName, userNickname, setApiError])

  useEffect(() => {
    setUserNickname(modalProps.nickname)
  }, [modalProps])

  useEffect(() => {
    getUserProfileHandler()
  }, [userNickname, getUserProfileHandler])

  useEffect(() => {
    getGameHistoryHandler()
  }, [page, getGameHistoryHandler])

  return (
    <div className={styles.backGround}>
      <div>
        <section className={styles.userProfile}>
          <button onClick={() => setModalName(null)} className={styles.closeBtn}>
            <Image src={closeBtn} alt={'closeBtn'} width={30} />
          </button>
          {userProfileInfo && <UserProfileInfo userProfileProps={userProfileInfo} />}
          <section className={styles.recentHistory}>
            <div className={styles.recentHistoryTitle}>
              <div className={styles.divideLine}></div>최 근 전 적
              <div className={styles.divideLine}></div>
            </div>
            <div className={styles.historyList}>
              {gameHistories && (
                <MyPageHistory
                  gameHistories={gameHistories.gameHistories}
                  targetNickname={userNickname}
                  totalItemsCount={gameHistories.totalItemsCount}
                />
              )}
            </div>
          </section>
        </section>
      </div>
      <section className={styles.pagenation}>
        {gameHistories && gameHistories.totalItemsCount > 5 && (
          <CustomPagination
            page={page}
            setPage={setPage}
            totalItemsCount={gameHistories.totalItemsCount}
            itemsCountPerPage={5}
          />
        )}
      </section>
    </div>
  )
}
