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
import { useModalState } from '@/store/store'

interface siginInResponse {
  userId: number
  isFirstLogin: boolean
  isMfaEnabled: boolean
  mfaQrCode?: string
}

function LoginPageContents(): JSX.Element {
  const [responseData, setResponseData] = useState<siginInResponse>()
  const [codeValue, setCodeValue] = useState<string>('')
  const { setAvatar, setMyNickname, setIsMfaEnabled, setMfaQrCOde, setUserId, mfaQrCode } =
    useNickNameImage()
  const { setModalName } = useModalState()
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
        if (mfaQrCode) {
          setModalName('mfa')
        } else {
          router.replace('/main')
        }
      }
    }
  }, [responseData, router, mfaQrCode])

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
              setIsMfaEnabled(res.data.isMfaEnabled)
              setUserId(res.data.userId)
              if (res.data.mfaUrl && res.data.isMfaEnabled) {
                setMfaQrCOde(res.data.mfaUrl)
                setModalName('mfa')
              }
            })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        if (error.response.status === 401) {
          router.replace('/login')
        }
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
