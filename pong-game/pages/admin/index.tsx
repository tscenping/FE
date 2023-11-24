import { instance } from '@/util/axios'
import { useEffect, useState } from 'react'

export default function Admin() {
  const [nickname, setNickname] = useState<string>('')

  useEffect(() => {
    console.log(nickname)
  }, [nickname])

  const blockHandler = async () => {
    if (nickname === '') {
      return
    }
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    try {
      await instance
        .post(
          `/auth/test/signin`,
          {
            nickname: nickname,
          },
          { withCredentials: true },
        )
        .then(function (res) {
          alert('userId = ' + res.data.userId)
          console.log(res.data)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <h1>AdminPage</h1>
      <input type="text" onChange={(e) => setNickname(e.target.value)}></input>
      <button onClick={blockHandler}>테스트 계정 생성</button>
    </>
  )
}
