import PageTitle from '@/components/UI/PageTitle'
import styles from './rank.module.scss'
import profileImage from '../../public/img/mypage/profileImage.svg'
import Image from 'next/image'
import { useModalState, useUserProfileModalState } from '@/store/store'
import Pagination from 'react-js-pagination'
import { useEffect, useState } from 'react'
import CustomPagination from '@/components/pagination/CustomPagination'
import DropDown from '@/components/DropDown/DropDown'

export default function Rank() {
  const { modalName, setModalName } = useModalState()
  const [page, setPage] = useState(1)
  const handlePageChange = (page: number) => {
    setPage(page)
    console.log(page)
  }
  const state1 = [1, 2, 3, 4]
  const state4 = [3, 2, 3, 4]
  const state3 = [4, 2, 3, 4]
  const state2 = [5, 2, 3, 4]
  const pages = ['state1', 'state2', 'state3', 'state4']

  useEffect(() => {
    console.log(pages[page])
  }, [page])
  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    // 다른 스타일 속성 추가
  }

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
              {/* <DropDown
                isDropDownView={true}
                dropDownState="userProfile"
                userProfile={{ isFriend: true, isBlock: false }}
              /> */}
              <DropDown
                isDropDownView={true}
                dropDownState="chating"
                chating={{   
                  isFriend: true,
                  isBlock: false,
                  isAdmin: true,
                  isOwner: true,
                  isMeAdmin: true,
                  isMeOwner: true, }}
              />
            </span>
          </div>

          <div className={styles.score}>4242</div>
        </div>
      </section>

      <section className={styles.page}>
        <CustomPagination itemsCountPerPage={5} totalItemsCount={10} />
        {/* <Pagination
        activePage={page}// 현제 보고있는 페이지 
        itemsCountPerPage={5}// 한페이지에 출력할 아이템수
        totalItemsCount={30}// 총 아이템수
        pageRangeDisplayed={3}// 표시할 페이지수
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
        /> */}
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
