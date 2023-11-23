import axios from 'axios'
import LoginPageComponent from '@/components/Login/LoginPageComponent'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '@/components/Login/Loading'

function LoginPage({ sendCode }) {
  // const [isLoading, setIsLoading] = useState(false)

  // const router = useRouter()

  // useEffect(() => {
  //   const headers = { 'Content-Type': 'application/json' }
  //   const instance = axios.create({
  //     // httpsAgent: new https.Agent({
  //     //   rejectUnauthorized: false,
  //     // }),
  //   })
  //   const fetchData = async () => {
  //     try {
  //       console.log(sendCode)
  //       if (!document.cookie && sendCode) {
  //         // setIsLoading(true)
  //         const response = await instance.post('https://localhost:3000/auth/signin', sendCode, {
  //           headers,
  //           withCredentials: true,
  //         })
  //         if (response.statusText === 'Created') {
  //           const responseData = await instance({
  //             url: 'https://localhost:3000/users/me',
  //             method: 'get',
  //             withCredentials: true,
  //             headers: headers,
  //           })
  //           if (responseData.data.avatar) {
  //             // router.replace('/main')
  //           }
  //           // setIsLoading(false)
  //           router.replace('/login/info') //router.push를 이용해서 "code"값을 제거한 상태인 페이지로 리다이렉션
  //         }
  //       } else if (document.cookie) {
  //         setIsLoading(true)
  //         const responseData = await instance({
  //           url: 'https://localhost:3000/users/me',
  //           method: 'get',
  //           withCredentials: true,
  //           headers: headers,
  //         })
  //         setIsLoading(false)
  //         if (responseData.data.avatar) {
  //           // router.replace('/main')
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }
  //   fetchData()
  //   // router.replace('/login/info') //router.push를 이용해서 "code"값을 제거한 상태인 페이지로 리다이렉션
  // }, [])

  // if (isLoading) return <Loading />
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
