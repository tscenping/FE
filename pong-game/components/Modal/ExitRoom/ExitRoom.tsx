import styles from './ExitRoom.module.scss'
import { useGetChannels, useJoinChannel, useJoinProtectedChannel } from '@/store/chat'
import { useModalState } from '@/store/store'
import { instance } from '@/util/axios'
import { socket } from '@/socket/socket'
import { useNickNameImage } from '@/store/login'

function ExitRoom(): JSX.Element {
  const { setPasswordInputRender } = useJoinProtectedChannel() //채널 나가기 모달에 띄워줄 채널 타이틀, api요청에 필요한 채널 id, 채널 나가기 성공할 경우 컴포넌트를 바꿔줄 플래그
  const {
    setAllChannels,
    setTotalAll,
    setTotalMe,
    setMeChannels,
    setPage,
    setDmChannels,
    setTotalDm,
  } = useGetChannels()
  const { channelId, setChannelUserInfo, channelTitle, setChannelId } = useJoinChannel()
  const { setModalName } = useModalState() //"확인" 버튼을 클릭했을 때, "취소" 버튼을 클릭했을 때 모달을 꺼주기 위한 set함수

  const exitRoomHandler = async () => {
    //"확인" 버튼을 클릭했을 때, api요청을 실행할 함수
    const datas = { channelId: channelId }
    try {
      console.log(datas)
      const response = await instance('/channels/exit', {
        method: 'patch',
        data: JSON.stringify(datas),
      })
      console.log(response)
      if (response.statusText === 'OK') {
        socket.off('message')
        const responseAll = await instance('/channels/all/?page=1', {
          method: 'get',
        })
        console.log(responseAll)
        const responseMe = await instance('/channels/me/?page=1', {
          method: 'get',
        })
        const responseDm = await instance('/channels/dm?page=1', {
          method: 'get',
        })
        setAllChannels(responseAll.data.channels)
        setMeChannels(responseMe.data.channels)
        setDmChannels(responseDm.data.dmChannels)
        setTotalAll(responseAll.data.totalDataSize)
        setTotalMe(responseMe.data.totalDataSize)
        setTotalDm(responseDm.data.totalItemCount)
        setChannelUserInfo(null)
        setChannelId(null) //방을 나갔다면 현재 내가 보고있는(렌더링) 채널은 없으므로 null값으로 channelId를 바꿔줘야 한다.

        setPage(1)
        setModalName(null) //모달 off
        setPasswordInputRender('DEFAULT') //"chatlog"의 컴포넌트를 "DEFAULT"로 바꿔준다.
      }
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const closeModalHandler = () => {
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
