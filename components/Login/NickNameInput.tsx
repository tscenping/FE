import { useState, RefObject } from 'react'
import styles from './NickNameInput.module.scss'

interface NickNameInputProps {
  inputRef: RefObject<HTMLInputElement>
  isValidNick: boolean
}

function NickNameInput(props: NickNameInputProps): JSX.Element {
  const [nickName, setNickName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')
    const truncatedValue = filteredValue.slice(0, 10)
    setNickName(truncatedValue)
    if (props.inputRef.current) {
      props.inputRef.current.value = truncatedValue
    }
  }

  return (
    <section className={styles.profileNickName}>
      <div className={styles.nickInputContainer}>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          className={styles.nickNameInput}
          maxLength={10}
          ref={props.inputRef}
          onChange={handleChange}
          required
        />
        <div className={styles.nickNameCharCount}>
          <span>{nickName.length}</span>
          <span>/ 10</span>
        </div>
      </div>
      <p>닉네임에 특수문자 및 공백을 입력하실 수 없습니다.</p>
    </section>
  )
}

export default NickNameInput
