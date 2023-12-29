import React from 'react'
import { GetServerSidePropsContext } from 'next'
import LoginPageComponent from '@/components/Login/LoginPageComponent'

function LoginInfoPage() {
  return (
    <>
      <LoginPageComponent />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const sendCode = JSON.stringify({ code: query.code })

  return {
    props: {
      sendCode,
    },
  }
}

export default LoginInfoPage
