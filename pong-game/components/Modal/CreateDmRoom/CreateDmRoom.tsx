import styles from './CreateDmRoom.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import Image from 'next/image'
import DmChat from '@/components/Chat/ChatType/DmChat'
import opponentProfileImage from '@/public/img/chat/userProfileImage.svg'

function CreateDmRoom(): JSX.Element {
  return (
    <div className={styles.back}>
      <ModalPageTitle title="DM 생성" subTitle="대화를 나눌 유저를 선택해주세요" />
      <ul className={styles.usersContainer}>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>sangyeki</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>him</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>jang-cho</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>yubchoi</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>jiyun</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>한글열글자한글열</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>abcdefghij</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>abcdefghij</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>abcdefghij</span>
        </li>
        <li className={styles.user}>
          <Image src={opponentProfileImage} alt={'user profile image'} />
          <span>abcdefghij</span>
        </li>
      </ul>
    </div>
  )
}

export default CreateDmRoom