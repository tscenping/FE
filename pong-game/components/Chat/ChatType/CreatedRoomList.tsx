import Image from 'next/image'
import styles from './CreatedRoomList.module.scss'
import passwordRoom from '../../../public/img/chat/lock.svg'

interface CreatedRoomListProps {
  title: string
}

function CreatedRoomList(props: CreatedRoomListProps): JSX.Element {
  return (
    <li className={styles.createdRoom}>
      <div className={styles.createdRoomContainer}>
        <Image src={passwordRoom} alt={'password chat room'} />
        <strong className={styles.createdRoomTitle}>{props.title}</strong>
      </div>
      <div>
        <span className={styles.createdRoomParticipants}>1 / 4</span>
      </div>
    </li>
  )
}

export default CreatedRoomList
