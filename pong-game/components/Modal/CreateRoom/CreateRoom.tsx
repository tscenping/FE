import { useRef } from 'react'
import styles from './CreateRoom.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import { useCreateRoomNavBarState } from '@/store/chat'
import CreateRoomInput from './CreateRoomInput/CreateRoomInput'

function CreateChatRoom(): JSX.Element {
  const { tabState, setTabState } = useCreateRoomNavBarState()
  const titleRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.createChatRoomContents}>
      <ModalPageTitle title="채팅방 생성" subTitle="유저들과 대화를 나눌 채팅방을 만들어보세요" />
      <nav className={styles.chatType}>
        <ul className={styles.chatTypeUnorderList}>
          <li className={tabState === '1' ? styles.selected : styles.noSelected}>
            <input
              type="radio"
              id="public"
              onClick={() => {
                setTabState('1')
              }}
            />
            <label htmlFor="public">Public</label>
          </li>
          <li className={tabState === '2' ? styles.selected : styles.noSelected}>
            <input
              type="radio"
              id="private"
              onClick={() => {
                setTabState('2')
              }}
            />
            <label htmlFor="private">Private</label>
          </li>
        </ul>
      </nav>
      <form className={styles.form} onSubmit={submitHandler}>
        <CreateRoomInput tabState={tabState} titleRef={titleRef} passwordRef={passwordRef} />
        {/* <p className={styles.error}>이미 존재하는 채팅방 이름 입니다.</p> */}
        <section className={styles.btn}>
          <button>Create</button>
          <button>Cancel</button>
        </section>
      </form>
    </div>
  )
}

export default CreateChatRoom
