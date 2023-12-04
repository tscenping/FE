import styles from './JoinRoom.module.scss'
import { instance } from '@/util/axios'
import {
  useReadyToChannel,
  useJoinChannel,
  useJoinProtectedChannel,
  useNavBarState,
} from '@/store/chat'
import { useModalState } from '@/store/store'

function JoinRoom(): JSX.Element {
  const { title, readyChannelId, setReadyChannelId, setTitle } = useReadyToChannel()
  const { setPasswordInputRender } = useJoinProtectedChannel()
  const { setChannelId, setChannelUserInfo, setChannelTitle } = useJoinChannel()
  const { setModalName } = useModalState()
  const { setTabState } = useNavBarState()

  const joinRoomHandler = async () => {
    try {
      const datas = { channelId: readyChannelId, password: null }
      const response = await instance({
        url: 'https://localhost:3000/channels/join',
        method: 'post',
        data: JSON.stringify(datas),
      })
      if (response.statusText === 'Created') {
        setChannelId(readyChannelId)
        setChannelUserInfo(response.data.channelUsers)
        setPasswordInputRender('CHANNEL')
        setChannelTitle(title)
        setReadyChannelId(null)
        setTitle(null)
        setTabState('JOINED')
        setModalName(null)
      }
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const modalOffHandler = () => {
    setModalName(null)
  }

  return (
    <div className={styles.joinRoomContainer}>
      <strong>{title}</strong>
      <p>채널에 입장하시겠습니까?</p>
      <section className={styles.joinRoomBtn}>
        <button onClick={joinRoomHandler}>입 장</button>
        <button onClick={modalOffHandler}>취 소</button>
      </section>
    </div>
  )
}

export default JoinRoom
