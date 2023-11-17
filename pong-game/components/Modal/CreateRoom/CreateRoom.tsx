import styles from './CreateRoom.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import { useCreateRoomNavBarState } from '@/store/chat'

function CreateRoom(): JSX.Element {
  const { tabState, setTabState } = useCreateRoomNavBarState()

  return (
    <div className={styles.back}>
      <ModalPageTitle title="채팅방 생성" subTitle="유저들과 대화를 나눌 채팅방을 만들어보세요" />
      <nav className={styles.type}>
        <ul className={styles.nav}>
          <li>
            <input
              type="radio"
              id="public"
              onClick={() => {
                setTabState('1')
              }}
            />
            <label htmlFor="public" className={tabState === '1' ? styles.on : styles.off}>
              Public
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="private"
              onClick={() => {
                setTabState('2')
              }}
            />
            <label htmlFor="private" className={tabState === '2' ? styles.on : styles.off}>
              Private
            </label>
          </li>
        </ul>
      </nav>
      {tabState === '1' && (
        <form className={styles.form}>
          {/* ref전달해서 컴포넌트화 */}
          <section className={styles.chatTitle}>
            <p>Title</p>
            <input
              type="text"
              maxLength={20}
              className={styles.chatTitleInput}
              placeholder="Please enter a title"
              required
            ></input>
          </section>
          {/* ref전달해서 컴포넌트화 */}
          <section className={styles.chatPassword}>
            <p>Password</p>
            <input
              type="password"
              className={styles.chatPasswordInput}
              maxLength={10}
              placeholder="If you want a password, please enter it"
            ></input>
          </section>
          {/* <p className={styles.error}>이미 존재하는 채팅방 이름 입니다.</p> */}
          <section className={styles.btn}>
            <button>Create</button>
            <button>Cancel</button>
          </section>
        </form>
      )}
      {tabState === '2' && (
        <form className={styles.form}>
          {/* ref전달해서 컴포넌트화 */}
          <section className={styles.chatTitle}>
            <p>Title</p>
            <input
              type="text"
              maxLength={20}
              className={styles.chatTitleInput}
              placeholder="Please enter a title"
              required
            ></input>
          </section>
          {/* <p className={styles.error}>이미 존재하는 채팅방 이름 입니다.</p> */}
          <section className={styles.btn}>
            <button>Create</button>
            <button>Cancel</button>
          </section>
        </form>
      )}
    </div>
  )
}

export default CreateRoom
