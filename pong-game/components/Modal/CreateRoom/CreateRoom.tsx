import { useRef, useState } from 'react'
import styles from './CreateRoom.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import { useCreateRoomNavBarState } from '@/store/chat'
import CreateRoomInput from './CreateRoomInput/CreateRoomInput'
import { instance } from '@/util/axios'
import { useModalState } from '@/store/store'

function CreateChatRoom(): JSX.Element {
  const { tabState, setTabState } = useCreateRoomNavBarState()
  const { setModalName } = useModalState()
  const [error, setError] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const createChannel = async (channelType, password = null) => {
    if (!titleRef.current || !titleRef.current.value) {
      setError('noTitle')
      return
    }
    if (passwordRef.current.value.length <= 8) {
      setError('lessPassword')
      passwordRef.current.value = ''
      return
    }
    const datas = {
      name: titleRef.current.value,
      channelType: password ? 'PRIVATE' : 'PUBLIC',
      password: channelType === 'PUBLIC' || 'DM' ? null : password,
    }
    try {
      const response = await instance({
        method: 'post',
        url: 'https://localhost:3000/channels',
        data: JSON.stringify(datas),
      })
      console.log(response)
      setModalName(null)
      titleRef.current.value = ''
      channelType !== 'PRIVATE' ? (passwordRef.current.value = '') : ''
    } catch (error) {
      console.log('Api Request fail : ', error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    switch (tabState) {
      case 'private':
        createChannel('PRIVATE')
        break
      case 'publicOrProtected':
        createChannel('PROTECTED', passwordRef.current.value)
        break
      default:
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
        {error === 'lessPassword' && (
          <p className={styles.error}>
            채널의 비밀번호는 8 ~ 16자의 영문, 숫자, 특수문자를 사용해주세요.
          </p>
        )}
        <section className={styles.btn}>
          <button>Create</button>
          <button
            onClick={() => {
              setModalName(null)
            }}
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  )
}

export default CreateChatRoom
