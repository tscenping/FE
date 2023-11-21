import LoginPageComponent from '@/components/Login/LoginPageComponent'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Login/Loading'
import { useRouter } from 'next/router'
import https from 'https'

function LoginInfoPage({ sendCode }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (document.cookie) {
      //이미 토큰을 발급받은 상태라면
      router.replace('/main') //router.push를 이용해서 "main"페이지로 리다이렉션
    }
    console.log(sendCode)
    const headers = { 'Content-Type': 'application/json' }
    const instance = axios.create({
      // httpsAgent: new https.Agent({
      //   rejectUnauthorized: false,
      // }),
    })
    const fetchData = async () => {
      try {
        if (!document.cookie) {
          setIsLoading(true)
          const response = await instance.post('https://localhost:3000/auth/signin', sendCode, {
            headers,
            withCredentials: true,
          })
          if (response.statusText === 'Created') {
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    router.replace('/login/info') //router.push를 이용해서 "code"값을 제거한 상태인 페이지로 리다이렉션
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      <LoginPageComponent />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { query } = context
  const sendCode = JSON.stringify({ code: query.code })

  return {
    props: {
      sendCode,
    },
  }
}

export default LoginInfoPage
