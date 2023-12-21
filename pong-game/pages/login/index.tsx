import LoginPageComponent from '@/components/Login/LoginPageComponent'

function LoginPage({ sendCode }) {
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

export default LoginPage
