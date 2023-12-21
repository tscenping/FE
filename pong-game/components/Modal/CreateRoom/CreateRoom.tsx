import { useRef, useState } from 'react'
import styles from './CreateRoom.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import { useCreateRoomNavBarState } from '@/store/chat'
import CreateRoomInput from './CreateRoomInput/CreateRoomInput'
import { instance } from '@/util/axios'
import { useModalState } from '@/store/store'
import { useGetChannels, useJoinChannel, useJoinProtectedChannel } from '@/store/chat'
import { socket } from '@/socket/socket'

function CreateChatRoom(): JSX.Element {
  const { tabState, setTabState } = useCreateRoomNavBarState()
  const { setModalName } = useModalState()
  const [error, setError] = useState('')
  const { setAllChannels, setTotalAll, setMeChannels, setTotalMe, setPage } = useGetChannels()
  const { setPasswordInputRender } = useJoinProtectedChannel()
  const {
    setChannelTitle,
    setChannelUserInfo,
    setChannelType,
    setChannelAuth,
    setChannelId,
    setChannelLogEmpty,
  } = useJoinChannel()
  const titleRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const createChannelHandler = async (channelType, password = null) => {
    const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g

    if (!titleRef.current?.value) {
      //title값을 입력안했거나 null일 경우에는 set state "noTitle"로 지정
      setError('noTitle') //title은 어차피 비워진 상태여서 따로 초기화 안해줘도 된다.
      return
    }
    if (channelType === 'PROTECTED' && !passwordRef.current.value) {
      //채널의 타입이 "PROTECTED"이지만 패스워드가 없다면 채널의 타입은 "PUBLIC"
      channelType = 'PUBLIC'
    }

    if (
      channelType === 'PROTECTED' &&
      (passwordRef.current.value.length < 8 ||
        !passwordRef.current.value ||
        koreanRegex.test(passwordRef.current.value))
    ) {
      //password값이 8자 이하일 경우 set state "lessPassword"로 지정
      setError('passwordError')
      passwordRef.current.value = '' //그리고 해당 비밀번호 입력 값을 비워준다.
      return
    }

    const datas = {
      //보내려는 데이터를 channel 타입에 맞춰서 값을 초기화
      name: titleRef.current.value, //모든 타입에는 공통적으로 title이 들어간다.
      channelType: channelType,
      password: channelType === 'PUBLIC' || channelType === 'PRIVATE' ? null : password,
      //채널의 타입이 PUBLIC이거나 PRIVATE라면 패스워드는 "null"
    }
    console.log(datas)
    try {
      const response = await instance('/channels', {
        method: 'post',
        data: JSON.stringify(datas),
      })
      console.log(response)
      if (response.statusText === 'Created') {
        //채널 생성에 성공한다면 모달창을 꺼주고 채널뷰를 생성한 채널뷰로 바꿔줘야한다.(채널뷰 변경 추가예정)
        setChannelLogEmpty([])
        const responseAll = await instance('/channels/all/?page=1', {
          method: 'get',
        })
        const responseMe = await instance('channels/me/?page=1', {
          method: 'get',
        })

        //"chat"페이지의 채널 목록과 페이지 네이션 전역상태변수 초기화
        setAllChannels(responseAll.data.channels)
        setTotalAll(responseAll.data.totalDataSize)
        setMeChannels(responseMe.data.channels)
        setTotalMe(responseMe.data.totalDataSize)

        //chatlog에 보이는 값들을 렌더링 하기 위한 전역 상태 변수 초기화
        setChannelTitle(titleRef.current.value)
        setChannelAuth(response.data.myChannelUserType)
        setChannelType(channelType)
        setChannelId(response.data.channelId)
        setPasswordInputRender('CHANNEL')
        setChannelUserInfo(response.data.channelUsers)

        setPage(1)
        setModalName(null)
      }
      titleRef.current.value = '' //기존에 남아있던 값을 비워준다.
      channelType !== 'PRIVATE' ? (passwordRef.current.value = '') : '' //채널의 타입이 "PRIVATE"가 아니라면 패스워드값을 비워준다.
    } catch (error) {
      console.log('Api Request fail : ', error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    switch (tabState) {
      case 'private':
        createChannelHandler('PRIVATE')
        break
      case 'publicOrProtected':
        createChannelHandler('PROTECTED', passwordRef.current.value)
        break
    }
  }

  return (
    <div className={styles.createChatRoomContents}>
      <ModalPageTitle title="채팅방 생성" subTitle="유저들과 대화를 나눌 채팅방을 만들어보세요" />
      <nav className={styles.chatType}>
        <ul className={styles.chatTypeUnorderList}>
          <li className={tabState === 'publicOrProtected' ? styles.selected : styles.noSelected}>
            <input
              type="radio"
              id="publicOrProtected"
              onClick={() => {
                setTabState('publicOrProtected')
                setError('')
                titleRef.current.value = ''
              }}
            />
            <label htmlFor="publicOrProtected">Public</label>
          </li>
          <li className={tabState === 'private' ? styles.selected : styles.noSelected}>
            <input
              type="radio"
              id="private"
              onClick={() => {
                setTabState('private')
                setError('')
                titleRef.current.value = ''
              }}
            />
            <label htmlFor="private">Private</label>
          </li>
        </ul>
      </nav>
      <form className={styles.form} onSubmit={submitHandler}>
        <CreateRoomInput tabState={tabState} titleRef={titleRef} passwordRef={passwordRef} />
        {error === 'noTitle' && <p className={styles.error}>채널 타이틀을 입력해 주세요.</p>}
        {error === 'passwordError' && (
          <p className={styles.error}>
            채널의 비밀번호는 8 ~ 16자의 영문, 숫자, 특수문자를 사용해주세요.
          </p>
        )}
        <section className={styles.btn}>
          <button>생 성</button>
          <button
            onClick={() => {
              setModalName(null)
            }}
          >
            취 소
          </button>
        </section>
      </form>
    </div>
  )
}

export default CreateChatRoom
