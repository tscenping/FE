import styles from './JoinRoom.module.scss'
import { instance } from '@/util/axios'
import {
  useReadyToChannel,
  useJoinChannel,
  useJoinProtectedChannel,
  useNavBarState,
} from '@/store/chat'
import { useModalState } from '@/store/store'
import { useErrorCheck } from '@/store/login'

function JoinRoom(): JSX.Element {
  const { title, readyChannelId, setReadyChannelId, setTitle, readyChannelType } =
    useReadyToChannel()
  const { setPasswordInputRender } = useJoinProtectedChannel()
  const {
    setChannelId,
    setChannelUserInfo,
    setChannelTitle,
    setChannelType,
    setChannelLogEmpty,
    setMyChannelUserType,
    setChannelAuth,
  } = useJoinChannel()
  const { setModalName } = useModalState()
  const { setTabState } = useNavBarState()
  const { setApiError } = useErrorCheck()

  const joinRoomHandler = async () => {
    try {
      const datas = { channelId: readyChannelId, password: null }
      const response = await instance('/channels/join', {
        method: 'post',
        data: JSON.stringify(datas),
      })
      if (response.statusText === 'Created') {
        setChannelLogEmpty([])
        setChannelId(readyChannelId)
        setChannelUserInfo(response.data.channelUsers)
        setMyChannelUserType(response.data.myChannelUserType)
        setChannelAuth(response.data.myChannelUserType)
        setPasswordInputRender('CHANNEL')
        setChannelTitle(title)
        setReadyChannelId(null)
        setChannelType(readyChannelType)
        setTitle(null)
        setTabState('JOINED')
        setModalName(null)
      }
    } catch (error) {
      if (error && error.response.status === 401) setApiError(401)
      setModalName(null)
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
