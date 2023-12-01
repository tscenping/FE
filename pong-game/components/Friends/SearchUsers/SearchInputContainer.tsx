import { RefObject } from 'react'
import Image from 'next/image'
import styles from './SearchInputContainer.module.scss'
import searchButton from '@/public/img/chat/enterInput.svg'

interface searchInputContainerProps {
  inputRef: RefObject<HTMLInputElement>
}

function SearchInputContainer({ inputRef }: searchInputContainerProps): JSX.Element {
  return (
    <>
      <input type="text" className={styles.searchInput} required maxLength={10} ref={inputRef} />
      <span className={styles.searchInputPlaceholder}>닉네임을 입력하세요.</span>
      <button className={styles.searchUserButton}>
        <Image src={searchButton} alt={'searh user button'} />
      </button>
    </>
  )
}

export default SearchInputContainer
