import { instance } from '@/util/axios'
import { useEffect, useState } from 'react'

import io from 'socket.io-client'

export default function Admin() {
  const [nickname, setNickname] = useState<string>('')
  

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

  const socketHandler = async () => {
    // socket.emit('ClientToServer', '123')
    // socket.on('ServerToClient', (data) => {
    //   console.log(123)
    // })
  }

  return (
    <>
      <h1>AdminPage</h1>
      <input type="text" onChange={(e) => setNickname(e.target.value)}></input>
      <button onClick={blockHandler}>테스트 계정 생성</button>
      <button onClick={socketHandler}>소켓 연결</button>
    </>
  )
}
