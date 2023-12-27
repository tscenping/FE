import { ReactNode, useEffect } from 'react'
import { useNickNameImage } from '@/store/login'
import { instance } from '@/util/axios'
import { useRouter, NextRouter } from 'next/router'
import { useErrorCheck } from '@/store/login'

export default function LoginCheck({ children }: { children: ReactNode }) {
  const { setMyNickname, setAvatar, avatar, myNickname } = useNickNameImage()
  const { setApiError, apiError } = useErrorCheck()
  const router: NextRouter = useRouter()
  const isLoginPage = router.pathname === '/login'
  const isSignPage = router.pathname === '/login/info'

  const getUserInfo = async () => {
    try {
      await instance.get('/users/me').then((res) => {
        if (res.data) {
          setMyNickname(res.data.nickname)
          setAvatar(res.data.avatar)
        }
      })
    } catch (error) {
      if (error.response.status === 401) setApiError(401)
      router.push('/login/info')
    }
  }

  useEffect(()=>{
    const intervalState = setInterval(()=>{
      if(!document.cookie){
        router.push('/login')
      }
    }, 5000)
    return ()=>{
      clearInterval(intervalState)
    }
  },[])

  useEffect(() => {
    if (isLoginPage) {
      if (document.cookie) {
        if (myNickname !== null && avatar !== null) {
          router.push('/main')
        } else if (myNickname === null || avatar === null) {
          router.push('/login/info')
        }
      }
    } else if (isSignPage && myNickname !== null && avatar !== null) {
      router.push('/main')
    } else if (!document.cookie && !isLoginPage && !apiError && router.pathname !== '/error') {
      router.push('/login')
    }
  }, [router.pathname])

  useEffect(() => {
    if (document.cookie) {
      getUserInfo()
    }
  }, [router.pathname])

  useEffect(() => {
    if (isLoginPage) {
      if (document.cookie) {
        if (myNickname !== null && avatar !== null) {
          router.push('/main')
        } else if (myNickname === null || avatar === null) {
          router.push('/login/info')
        }
      }
    } else if (isSignPage && myNickname !== null && avatar !== null) {
      router.push('/main')
    }
    if (isLoginPage) {
      return
    } else {
      if (!document.cookie && !apiError) {
        router.push('/login')
      } else if (myNickname === null || avatar === null) {
        router.push('/login/info')
      }
    }
  }, [myNickname, avatar])

  // 1. 쿠키 있는지 확인 -> 없으면 login
  // 2. 쿠키 있음 -> 유저정보가 없으면 -> login/info
  // 3. 쿠키 있음 -> 유저정보 있음 -> login 접근 시 main으로 이동

  // 1. 쿠키가 유효하지 않으면 로그인 페이지로 이동
  // 2. 쿠기가 유효함 -> 유저 정보를 가져옴 -> 유저 정보가 없으면 회원가입 페이지로 이동
  // 3. 유저 정보가 있으면 main페이지
  // 4. 유저정보가 없으면 login/info 페이지

  // useEffect(() => {
  //   if (!document.cookie) {
  //     if (!router.query.code) {
  //       router.replace('/login')
  //     }
  //   }
  // }, [router.pathname, router.query.code])

  return <> {children}</>
}
