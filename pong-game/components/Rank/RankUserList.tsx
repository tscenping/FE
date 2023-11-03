import { useModalState, useUserProfileModalState } from '@/store/store'
import profileImage from '../../public/img/mypage/profileImage.svg'
import styles from './RankUserList.module.scss'
import Image from 'next/image'

interface RankUserListProps {
  nickname: string
  avatar: string
  ladderScore: number
  ranking: number,
}



export default function RankUserList({ nickname, avatar, ladderScore, ranking }: RankUserListProps) {
  const { modalName, setModalName } = useModalState()
  const { modalProps, setModalProps } = useModalState()

  async function setModalPropsValue(nickname: string){
    setModalProps({nickname: nickname})
    setModalName('userProfile');
  }
  return (
    <>
      <div className={styles.rankContent}>
        <div
          className={styles.userInfo}
          onClick={() => {
            setModalPropsValue(nickname);
          }}
        >
          <span className={styles.rank}>{ranking}. </span>
          <span className={styles.userName}>
            <Image
              src={profileImage}
              alt={'profileImage'}
              // className={styles.radioImg}
              width={64}
              // height={40}
            />
            {nickname}
            {/* <DropDown
                isDropDownView={true}
                dropDownState="userProfile"
                userProfile={{ isFriend: true, isBlock: false }}
              /> */}
          </span>
        </div>
        <div className={styles.score}>{ladderScore}</div>
      </div>
    </>
  )
}
