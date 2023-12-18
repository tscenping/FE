import Image from 'next/image'
import styles from './LoginPageContents.module.scss'
import logo from '../../public/img/login/logo.svg'
import stick from '../../public/img/login/stick.svg'
import LoginButton from './LoginButton/LoginButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Loading from './Loading'
import { useNickNameImage } from '@/store/login'

interface siginInResponse {
  userId: number
  isFirstLogin: boolean
  isMfaEnabled: boolean
  mfaQrCode?: string
}

function LoginPageContents(): JSX.Element {
  const [responseData, setResponseData] = useState<siginInResponse>()
  const [codeValue, setCodeValue] = useState<string>('')
  const { setAvatar, setMyNickname, setIsMfaEnabled } = useNickNameImage()
  const router = useRouter()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setCodeValue(urlParams.get('code'))
    console.log(codeValue)
  }, [router])

  useEffect(() => {
    if (responseData && responseData.isFirstLogin !== undefined) {
      if (responseData.isFirstLogin) {
        setAvatar(null)
        setMyNickname(null)
        router.replace('/login/info')
      } else {
        router.replace('/main')
      }
    }
  }, [responseData, router])

  useEffect(() => {
    if (!codeValue) {
      return
    }
    console.log(codeValue)
    const headers = { 'Content-Type': 'application/json' }
    const instance = axios.create({})
    const fetchData = async () => {
      try {
        if (!document.cookie) {
          console.log(codeValue)
          const response = await instance
            .post(
              'https://localhost:3000/auth/signin',
              { code: codeValue },
              {
                headers,
                withCredentials: true,
              },
            )
            .then((res) => {
              console.log(res.data)
              setResponseData(res.data)
            })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [codeValue])

  return (
    <>
      {codeValue ? (
        <Loading />
      ) : (
        <div className={styles.loginPageContents}>
          <ul className={styles.loginPageContentsContainer}>
            <li className={styles.logo}>
              <Image src={logo} alt={'logo'} width={300} height={300} />
              <Image src={stick} alt={'logo stick'} width={80} height={80} />
            </li>
            <LoginButton content="42" />
            {/* <LoginButton content="google" /> */}
          </ul>
          <div className={styles.pingpong}></div>
        </div>
      )}
    </>
  )
}

export default LoginPageContents
