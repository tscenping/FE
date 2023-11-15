import LoginPageComponent from '@/components/Login/LoginPageComponent'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/Login/Loading'
// import cookies from 'next-cookies'

function LoginInfoPage({ sendCode }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
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
