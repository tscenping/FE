import { RefObject } from 'react'
import styles from './CreateRoomInput.module.scss'

interface CreateRoomInputProps {
  tabState: string
  titleRef: RefObject<HTMLInputElement>
  passwordRef: RefObject<HTMLInputElement>
}

function CreateRoomInput(props: CreateRoomInputProps): JSX.Element {
  const titleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const truncatedValue = e.target.value.slice(0, 8)
    if (props.titleRef.current) {
      props.titleRef.current.value = truncatedValue
    }
  }

  const passwordHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.passwordRef.current) {
      props.passwordRef.current.value = e.target.value
    }
  }

  return (
    <>
      <section className={styles.chatTitle}>
        <label htmlFor="inputTitle">Title</label>
        <input
          type="text"
          maxLength={20}
          className={styles.chatTitleInput}
          placeholder="Please enter a title"
          id="inputTitle"
          ref={props.titleRef}
          onChange={titleHandleChange}
          required
        ></input>
      </section>
      {props.tabState === '1' && (
        <section className={styles.chatPassword}>
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className={styles.chatPasswordInput}
            maxLength={10}
            placeholder="If you want a password, please enter it"
            ref={props.passwordRef}
            id="inputPassword"
            onChange={passwordHandleChange}
          ></input>
        </section>
      )}
    </>
  )
}

export default CreateRoomInput