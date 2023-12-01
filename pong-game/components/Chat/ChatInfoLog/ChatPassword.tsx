import { useRef } from 'react'
import Image from 'next/image'
import lock from '@/public/img/chat/lock.svg'
import submitMessage from '@/public/img/chat/enterInput.svg'
import styles from './ChatPassword.module.scss'
import ChatPasswordInput from '../Input/ChatPasswordInput'
import { useJoinChannel, useJoinProtectedChannel } from '@/store/chat'
import { instance } from '@/util/axios'

function ChatPassword(): JSX.Element {
  const passwordRef = useRef<HTMLInputElement>(null)
  const { channelTitle, channelId, setPasswordInputRender } = useJoinProtectedChannel() //해당 채널 이름과 채널 id를 렌더링, api요청 하기 위해 타이틀 전역변수 가져오기
  const { setChannelUserInfo } = useJoinChannel()

  const passwordHandler = async (e) => {
    // console.log(channelTitle)
    // console.log(channelId)
    // console.log(passwordRef.current.value)
    e.preventDefault()
    const datas = { channelId: channelId, password: passwordRef.current.value }
    try {
      //전달받은 channelId와 입력한 해당 채널의 비밀번호 값을 통해서 "/join" api요청을 보낸다.
      const response = await instance({
        url: 'https://localhost:3000/channels/join',
        method: 'post',
        data: datas,
      })

      //response에 있는 채널 유저 리스트 항목을 토대로 채널로그 유저 리스트에 렌더링 해야한다
      if (response.statusText === 'Created') {
        //채널 join에 성공했을 경우 기존 비밀번호 입력 컴포넌트를 "false"로 바꿔준다.
        console.log(response.data)
        setChannelUserInfo(response.data.channelUsers)
        setPasswordInputRender('CHANNEL')
      }
    } catch (error) {
      console.log('Error : ', error)
      //틀린 비밀번호일 때 예외처리 해야한다.
    }
    passwordRef.current.value = ''
  }

  return (
    <div className={styles.chatPassword}>
      <div className={styles.chatRoomName}>
        <Image src={lock} alt={'password room'} />
        <h1 className={styles.RoomName}>{channelTitle}</h1>
      </div>
      {/* <p className={styles.wrongPassword}>잘못된 비밀번호 입니다.</p> */}
      <form className={styles.chatPasswordInput} onSubmit={passwordHandler}>
        <ChatPasswordInput passwordRef={passwordRef} />
        <button className={styles.submitPassword}>
          <Image src={submitMessage} alt={'submit message'} width={30} />
        </button>
      </form>
    </div>
  )
}

export default ChatPassword
