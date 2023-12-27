import Image from 'next/image'
import styles from './LoginPageContents.module.scss'
import logo from '../../public/img/login/logo.svg'
import stick from '../../public/img/login/stick.svg'
import LoginButton from './LoginButton/LoginButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from './Loading'
import { useNickNameImage } from '@/store/login'
import { useModalState } from '@/store/store'
import { instance } from '@/util/axios'
import { useErrorCheck } from '@/store/login'

interface siginInResponse {
  userId: number
  isFirstLogin: boolean
  isMfaEnabled: boolean
  mfaQrCode?: string
}

function LoginPageContents(): JSX.Element {
  const [responseData, setResponseData] = useState<siginInResponse>()
  const [codeValue, setCodeValue] = useState<string>('')
  const { setAvatar, setMyNickname, setIsMfaEnabled, setMfaQrCOde, setUserId, isMfaEnabled } =
    useNickNameImage()
  const { setModalName } = useModalState()
  const router = useRouter()
  const { setApiError } = useErrorCheck()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setCodeValue(urlParams.get('code'))
  }, [router])

  useEffect(() => {
    if (responseData && responseData.isFirstLogin !== undefined) {
      if (responseData.isFirstLogin) {
        setAvatar(null)
        setMyNickname(null)
        router.replace('/login/info')
      } else {
        if (isMfaEnabled) {
          setModalName('mfa')
        } else {
          router.replace('/main')
        }
      }
    }
  }, [responseData, router, isMfaEnabled, setAvatar, setModalName, setMyNickname])

  useEffect(() => {
    if (!codeValue) {
      return
    }
    console.log(codeValue)
    // const headers = { 'Content-Type': 'application/json' }
    // const instance = axios.create({})
    const fetchData = async () => {
      try {
        if (!document.cookie) {
          const datas = { code: codeValue }
          await instance('/auth/signin', {
            method: 'post',
            data: JSON.stringify(datas),
          }).then((res) => {
            setResponseData(res.data)
            setIsMfaEnabled(res.data.isMfaEnabled)
            setUserId(res.data.userId)
            if (res.data.isMfaEnabled) {
              setMfaQrCOde(res.data.mfaUrl)
              setModalName('mfa')
            }
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        if (error.response.status === 401) setApiError(401)
      }
    }
    fetchData()
  }, [codeValue, router, setIsMfaEnabled, setMfaQrCOde, setModalName, setUserId, setApiError])

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
