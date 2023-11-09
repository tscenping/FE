import LoginPageComponent from '@/components/Login/LoginPageComponent'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import https from 'https'
// import cookies from 'next-cookies'

function LoginInfoPage({ sendCode }) {
  const [data, setData] = useState(null)
  // const [isLoading, setLoading] = useState(true)

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
        const response = await instance.post('https://localhost:3000/auth/signin', sendCode, {
          headers,
          withCredentials: true,
        })
        // Do something with the response if needed
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // if (isLoading) return <p>Loading...</p>

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

  return {
    props: {
      sendCode,
    },
  }
}

export default LoginInfoPage
