import { useModalState } from '@/store/store'
import profileImage from '../../public/img/mypage/profileImage.svg'
import styles from './RankUserList.module.scss'
import Image from 'next/image'

interface RankUserListProps {
  nickname: string
  avatar: string
  ladderScore: number
  ranking: number
}

export default function RankUserList({
  nickname,
  // avatar,
  ladderScore,
  ranking,
}: RankUserListProps) {
  const { setModalName, setModalProps } = useModalState()

  function setModalPropsValue(nickname: string) {
    setModalName('userProfile')
    setModalProps({ nickname: nickname })
  }
  return (
    <>
      <div className={styles.rankContent}>
        <div
          className={styles.userInfo}
          onClick={() => {
            setModalPropsValue(nickname)
          }}
        >
          <span className={styles.rank}>{ranking}. </span>
          <span className={styles.userName}>
            <Image src={profileImage} alt={'profileImage'} width={64} />
            {nickname}
          </span>
        </div>
        <div className={styles.score}>{ladderScore}</div>
      </div>
    </>
  )
}
