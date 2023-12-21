import { FormEvent, useRef, useEffect } from 'react'
import styles from './SearchUsers.module.scss'
import SearchInputContainer from './SearchInputContainer'
import SearchUsersListContainer from './SearchUsersListContainer'
import { instance } from '@/util/axios'
import { useGetUser } from '@/store/friend'

function SearchUsers(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>()
  const { setUser } = useGetUser()

  const patternSpecial = /[~₩;'"!@#$%^&*()_+|<>?:{}\s]/ //특수문자 입력 정규식
  const searchNicknameHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (patternSpecial.test(inputRef.current.value)) {
      inputRef.current.value = ''
    }
    try {
      const response = await instance(`/users/profile/${inputRef.current.value}`, {
        method: 'get',
      })
      if (response.statusText === 'OK') {
        setUser(response.data)
      }
    } catch (error) {
      console.log('Error : ', error)
    }

    if (inputRef.current?.value) {
      inputRef.current.value = ''
    }
  }
  useEffect(() => {
    return () => {
      setUser(null)
    }
  }, [])
  return (
    <div className={styles.searchUsers}>
      <form className={styles.searchInputContainer} onSubmit={searchNicknameHandler}>
        <SearchInputContainer inputRef={inputRef} />
      </form>
      <div className={styles.findUserList}>
        <SearchUsersListContainer />
      </div>
    </div>
  )
}

export default SearchUsers
