import Image from 'next/image'
import styles from './SearchInputContainer.module.scss'
import searchButton from '@/public/img/chat/enterInput.svg'

function SearchInputContainer(): JSX.Element {
  return (
    <div className={styles.searchInputContainer}>
      <input type="text" className={styles.searchInput} required maxLength={10} />
      <span className={styles.searchInputPlaceholder}>닉네임을 입력하세요.</span>
      <button className={styles.searchUserButton}>
        <Image src={searchButton} alt={'searh user button'} />
      </button>
    </div>
  )
}

export default SearchInputContainer
