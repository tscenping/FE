import styles from './ExitRoom.module.scss'
import { useJoinProtectedChannel } from '@/store/chat'
import { useModalState } from '@/store/store'
import { instance } from '@/util/axios'

function ExitRoom(): JSX.Element {
  const { channelTitle, channelId, setPasswordInputRender, setChannelId, setChannelTitle } =
    useJoinProtectedChannel()
  const { setModalName } = useModalState()
  const exitRoomHandler = async (e) => {
    const datas = { channelId: channelId }
    try {
      const response = await instance({
        url: 'https://localhost:3000/channels/exit',
        method: 'patch',
        data: JSON.stringify(datas),
      })
      console.log(response)
      if (response.statusText === 'OK') {
        setModalName(null)
        setPasswordInputRender('DEFAULT')
      }
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const closeModalHandler = (e) => {
    setModalName(null)
  }
  return (
    <div className={styles.exitRoomModalContainer}>
      <h1 className={styles.channelTitle}>{channelTitle}</h1>
      <p>채널에서 나가시겠습니까?</p>
      <div className={styles.buttonContainer}>
        <button onClick={exitRoomHandler}>확 인</button>
        <button onClick={closeModalHandler}>취 소</button>
      </div>
    </div>
  )
}

export default ExitRoom
