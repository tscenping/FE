import styles from './UserList.module.scss'
import Image from 'next/image'
import { useModalState } from '@/store/store'
import { useReadyToChannel } from '@/store/chat'
interface userinfoProps {
  id: number
  nickname: string
  avatar: string
  status: string
}

function UserList(props: userinfoProps): JSX.Element {
  const { setModalName, modalProps, setModalProps } = useModalState()
  const { setTitle, setReadyChannelId, setDmAvatar } = useReadyToChannel()

  const createDmChatHandler = () => {
    setTitle(props.nickname)
    setReadyChannelId(props.id)
    setDmAvatar(props.avatar)
    if (modalProps.modalType === 'DM') setModalName('joinDmRoom')
    if (modalProps.modalType === 'INVITE') setModalName('inviteFriend')
    if (modalProps.modalType === 'GAME') {
      setModalProps({ ...modalProps, userId: props.id, nickname: props.nickname, avatar: props.avatar })
      setModalName('inviteGame')}
  }

  return (
    <li className={styles.user} onClick={createDmChatHandler}>
      <Image src={props.avatar} alt={'user profile image'} width={40} height={40} />
      <span>{props.nickname}</span>
    </li>
  )
}

export default UserList
