import styles from './InviteFriend.module.scss'
import Image from 'next/image'
import { useReadyToChannel, useJoinChannel } from '@/store/chat'
import { useModalState } from '@/store/store'
import { instance } from '@/util/axios'

function InviteFriend(): JSX.Element {
  const { title, readyChannelId, dmAvatar } = useReadyToChannel()
  const { channelId } = useJoinChannel()
  const { setModalName } = useModalState()

  const inviteUserHandler = async () => {
    try {
      const datas = { channelId: channelId, invitedUserId: readyChannelId }
      const response = await instance('/channels/invite', {
        method: 'post',
        data: JSON.stringify(datas),
      })
      if (response.statusText === 'Created') {
        setModalName(null)
      }
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const modalOffHandler = () => {
    setModalName('friendUsers')
  }

  return (
    <div className={styles.joinDmRoomContainer}>
      <Image src={dmAvatar} alt="opponent avatar" width={80} height={80} />
      <strong>{title}</strong>
      <p>해당 유저를 초대하시겠습니까?</p>
      <div className={styles.joinDmRoomBtn}>
        <button onClick={inviteUserHandler}>초 대</button>
        <button onClick={modalOffHandler}>취 소</button>
      </div>
    </div>
  )
}

export default InviteFriend
