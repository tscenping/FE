import Image from 'next/image'
import styles from './CreatedRoomList.module.scss'
import passwordRoom from '../../../public/img/chat/lock.svg'
import { instance } from '@/util/axios'
import { useJoinChannel, useJoinProtectedChannel, useReadyToChannel } from '@/store/chat'
import { useModalState } from '@/store/store'
import { socket } from '@/socket/socket'

interface CreatedRoomListProps {
  title: string //해당 채널의 타이틀
  channelType: string //채널 타입에 따라서 자물쇠 표시 여부
  channelId: number //채널의 id
  entered: boolean //내가 참여한 방인지 아닌지 판단하는 플래그(백엔드에서 전해준게 아닌 단순 컴포넌트 구분 프론트 전용 플래그)
  userCount: string //채널에 참여한 유저의 수
  isJoined: boolean //내가 참여한 방인지 아닌지 판단하는 플래그(전체목록에서 참여한 채널을 들어갈 수 있게 해주는 플래그)
}

function CreatedRoomList(props: CreatedRoomListProps): JSX.Element {
  const { setPasswordInputRender, setChannelProtectedId } = useJoinProtectedChannel()
  const {
    setChannelAuth,
    setMyChannelUserType,
    setChannelType,
    setChannelId,
    setChannelUserInfo,
    setChannelTitle,
    setChannelLogEmpty,
    channelId,
  } = useJoinChannel()
  const { setModalName } = useModalState()
  const { setTitle, setReadyChannelId } = useReadyToChannel()
  const passwordIconClassName = props.channelType === 'PROTECTED' ? styles.show : styles.none

  const joinChannelHandler = async () => {
    if (props.isJoined) {
      try {
        if (channelId !== props.channelId) {
          const response = await instance({
            url: `https://localhost:3000/channels/enter/${props.channelId}`, //쿼리스트링으로 해당 채널의 id값을 붙여주고 "/enter/:channelId" api요청 실행
            method: 'get',
          })
          setChannelLogEmpty([])
          setChannelAuth(response.data.myChannelUserType)
          setChannelType(props.channelType)
          setPasswordInputRender('CHANNEL')
          setChannelUserInfo(response.data.channelUsers)
          setMyChannelUserType(response.data.myChannelUserType)
          setChannelTitle(props.title)
          setChannelId(props.channelId)
        }
      } catch (error) {
        console.log('Error : ', error)
      }
    } else {
      if (props.entered) {
        //참여 목록에서 이미 참여했던 채널을 다시 들어가려는 경우
        try {
          if (channelId !== props.channelId) {
            const response = await instance({
              url: `https://localhost:3000/channels/enter/${props.channelId}`, //쿼리스트링으로 해당 채널의 id값을 붙여주고 "/enter/:channelId" api요청 실행
              method: 'get',
            })
            setChannelLogEmpty([])
            setChannelAuth(response.data.myChannelUserType)
            setChannelType(props.channelType)
            setPasswordInputRender('CHANNEL')
            setChannelUserInfo(response.data.channelUsers)
            setMyChannelUserType(response.data.myChannelUserType)
            setChannelTitle(props.title)
            setChannelId(props.channelId)
          }
        } catch (error) {
          console.log('Error : ', error)
        }
      } else {
        if (props.channelType === 'PROTECTED') {
          //"Protected"모드인 채널은 해당 채널을 누르자마자 입장하는게 아닌 비밀번호를 입력해야 하므로 비밀번호를 입력하는 컴포넌트에서 "/join"api요청을 보낸다.
          setChannelTitle(props.title) //비밀번호 입력창에 채널 타이틀을 띄우기 위한 title 전역 상태변수
          setChannelProtectedId(props.channelId) //"/join" api요청에 같이 보낼 데이터인 채널 id 전역 상태 변수
          setChannelId(props.channelId)
          setPasswordInputRender('PASSWORD') //chat log에서 어떤 컴포넌트를 렌더링 시킬지 판단하는 전역 상태변수
          setChannelUserInfo(null)
        } else {
          const datas = { channelId: props.channelId, password: null }
          try {
            setReadyChannelId(props.channelId)
            setTitle(props.title)
            setModalName('joinRoom') //"PUBLIC"채널에 join 할 시에는 모달창을 띄워서 한번 더 참여 여부를 물어본다.
          } catch (error) {
            console.log('Error : ', error)
          }
        }
      }
    }
  }
  return (
    <li className={styles.createdRoom} onClick={joinChannelHandler}>
      <div className={styles.createdRoomContainer}>
        <strong className={styles.createdRoomTitle}>{props.title}</strong>
      </div>
      <div className={styles.createdRoomTypeAndParicipants}>
        <Image src={passwordRoom} alt={'password chat room'} className={passwordIconClassName} />
        <span className={styles.createdRoomParticipants}>{props.userCount} / 10</span>
      </div>
    </li>
  )
}

export default CreatedRoomList
