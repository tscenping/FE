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
  avatar,
  ladderScore,
  ranking,
}: RankUserListProps) {
  const { setModalName, setModalProps } = useModalState()
  const baseImg = process.env.NEXT_PUBLIC_API_DEFAULT_PRIFILE_IMAGE

  function setModalPropsValue(nickname: string) {
    setModalName('userProfile')
    setModalProps({ nickname: nickname })
  }
  return (
    <>
      <div
        className={styles.rankContent}
        onClick={() => {
          setModalPropsValue(nickname)
        }}
      >
        <div className={styles.userInfo}>
          <span className={styles.rank}>{ranking}. </span>
          <span className={styles.userName}>
            <Image src={avatar ? avatar : baseImg} alt={'profileImage'} width={64} height={64} />
            {nickname}
          </span>
        </div>
        <div className={styles.score}>{ladderScore}</div>
      </div>
    </>
  )
}
