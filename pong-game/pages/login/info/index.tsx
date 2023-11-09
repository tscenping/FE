import LoginPageComponent from '@/components/Login/LoginPageComponent'
import axios from 'axios'
import React from 'react'

function LoginInfoPage() {
  return (
    <>
      <LoginPageComponent />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { query, res, req } = context
  // const sendCode = JSON.stringify({ code: query.code })
  // const headers = { 'Content-Type': 'application/json' }
  // const response = await axios({
  //   method: 'post',
  //   url: 'http://localhost:3000/auth/signin',
  //   withCredentials: true,
  //   headers: headers,
  //   data: sendCode,
  // })
  // const cookieStore = cookies()
  // const accessToken = cookieStore.get('accessToken')

  // const response2 = await axios({
  //   method: 'post',
  //   url: 'http://localhost:3000/auth/login',
  //   withCredentials: true,
  //   headers: headers,
  //   data: sendCode,
  // })
  return {
    props: {},
  }
}

export default LoginInfoPage
