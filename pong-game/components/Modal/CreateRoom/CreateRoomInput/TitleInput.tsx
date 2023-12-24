import { RefObject, useState } from 'react'
import styles from './TitleInput.module.scss'

interface TitleInputProps {
  titleRef: RefObject<HTMLInputElement>
}

function TitleInput(props: TitleInputProps): JSX.Element {
  const [title, setTitle] = useState('')

  const titleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[`~₩;'"!@#$%^&*()_+|<>?:{}\s]/g, '')
    const truncatedValue = filteredValue.slice(0, 10)
    setTitle(filteredValue)
    if (props.titleRef.current) {
      props.titleRef.current.value = truncatedValue
    }
  }

  return (
    <section className={styles.chatTitle}>
      <label htmlFor="inputTitle">Title</label>
      <input
        type="text"
        maxLength={20}
        className={styles.chatTitleInput}
        placeholder="Please enter a title"
        id="inputTitle"
        ref={props.titleRef}
        value={title}
        onChange={titleHandleChange}
      ></input>
    </section>
  )
}

export default TitleInput
