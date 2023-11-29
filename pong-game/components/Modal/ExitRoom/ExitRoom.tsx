import styles from './ExitRoom.module.scss'
import { useJoinProtectedChannel } from '@/store/chat'
import { useModalState } from '@/store/store'
import { instance } from '@/util/axios'

function ExitRoom(): JSX.Element {
  const { channelTitle, channelId, setPasswordInputRender } = useJoinProtectedChannel() //채널 나가기 모달에 띄워줄 채널 타이틀, api요청에 필요한 채널 id, 채널 나가기 성공할 경우 컴포넌트를 바꿔줄 플래그
  const { setModalName } = useModalState() //"확인" 버튼을 클릭했을 때, "취소" 버튼을 클릭했을 때 모달을 꺼주기 위한 set함수
  const exitRoomHandler = async (e) => {
    //"확인" 버튼을 클릭했을 때, api요청을 실행할 함수
    const datas = { channelId: channelId }
    try {
      const response = await instance({
        url: 'https://localhost:3000/channels/exit',
        method: 'patch',
        data: JSON.stringify(datas),
      })
      // console.log(response)
      if (response.statusText === 'OK') {
        //"api"요청에 성공했을 시
        setModalName(null) //모달 off
        setPasswordInputRender('DEFAULT') //"chatlog"의 컴포넌트를 "DEFAULT"로 바꿔준다.
      }
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const closeModalHandler = (e) => {
    //취소 버튼 눌렀을 시 모달 off
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
