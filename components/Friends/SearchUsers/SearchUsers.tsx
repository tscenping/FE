import { FormEvent, useRef, useEffect } from 'react'
import styles from './SearchUsers.module.scss'
import SearchInputContainer from './SearchInputContainer'
import SearchUsersListContainer from './SearchUsersListContainer'
import { instance } from '@/util/axios'
import { useGetUser } from '@/store/friend'
import { useErrorCheck } from '@/store/login'

function SearchUsers(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>()
  const { setUser } = useGetUser()
  const { setApiError } = useErrorCheck()
  const patternSpecial = /[`~₩;' "!@#$%^&*()_+|<>?:{}=\\\[\]\\/s]/

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
      if (error && error.response.status === 401) setApiError(401)
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
  }, [setUser])

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
