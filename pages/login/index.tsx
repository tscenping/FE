import LoginPageComponent from '@/components/Login/LoginPageComponent'
import { GetServerSidePropsContext } from 'next'

function LoginPage() {
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

export default LoginPage
