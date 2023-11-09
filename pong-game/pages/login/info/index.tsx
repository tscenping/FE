import LoginPageComponent from '@/components/Login/LoginPageComponent'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import https from 'https'
// import cookies from 'next-cookies'

function LoginInfoPage({ sendCode }) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    console.log(sendCode)

    const headers = { 'Content-Type': 'application/json' }
    const instance = axios.create({
      // httpsAgent: new https.Agent({
      //   rejectUnauthorized: false,
      // }),
    })

    const response = instance
      .post('https://localhost:3000/auth/signin', sendCode, {
        headers,
        withCredentials: true,
      })
      .then(() => setLoading(false))
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <LoginPageComponent />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { query, res, req } = context
  const sendCode = JSON.stringify({ code: query.code })
  const headers = { 'Content-Type': 'application/json' }

  // console.log(sendCode)

  // const instance = axios.create({
  //   httpsAgent: new https.Agent({
  //     rejectUnauthorized: false,
  //   }),
  // })

  // const response = await instance.post('https://localhost:3000/auth/signin', sendCode, {
  //   headers,
  //   withCredentials: true,
  // })
  // const response = await instance.post('https://localhost:3000/auth/signin', {
  //   sendCode,
  // })

  // console.log(response)

  // const cookieStore = cookies()
  // const accessToken = cookieStore.get('accessToken')
  // console.log(accessToken)

  // const response2 = await axios({
  //   method: 'post',
  //   url: 'https://localhost:3000/auth/login',
  //   withCredentials: true,
  //   headers: headers,
  //   data: sendCode,
  // })
  return {
    props: {
      sendCode,
    },
  }
}

export default LoginInfoPage
