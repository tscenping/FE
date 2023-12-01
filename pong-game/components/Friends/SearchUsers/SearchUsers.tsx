import { FormEvent, useRef } from 'react'
import styles from './SearchUsers.module.scss'
import FrinedUsersListContainer from '../FriendUsersListContainer'
import SearchInputContainer from './SearchInputContainer'
import SearchUsersListContainer from './SearchUsersListContainer'
import { instance } from '@/util/axios'
import { useGetUser } from '@/store/friend'

function SearchUsers(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>()
  const { setUser } = useGetUser()
  const searchNicknameHandler = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await instance({
        url: `https://localhost:3000/users/profile/${inputRef.current.value}`,
        method: 'get',
      })
      setUser(response.data)
      console.log(response)
    } catch (error) {
      console.log('Error : ', error)
    }

    if (inputRef.current?.value) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className={styles.searchUsers}>
      <form className={styles.searchInputContainer} onSubmit={searchNicknameHandler}>
        <SearchInputContainer inputRef={inputRef} />
      </form>
      <div className={styles.findUserList}>
        {/* <FrinedUsersListContainer /> */}
        <SearchUsersListContainer />
      </div>
    </div>
  )
}

export default SearchUsers
