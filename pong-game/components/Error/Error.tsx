import styles from './Error.module.scss'
import Image from 'next/image'
import logo from '@/public/img/login/logo.svg'
import PageTitle from '../UI/PageTitle'
import { useErrorCheck } from '@/store/login'
import Link from 'next/link'
import { useEffect } from 'react'

function Error(): JSX.Element {
  const { apiError, duplicateLoginError, setApiError } = useErrorCheck()

  useEffect(() => {
    setApiError(401)
    return () => {
      setApiError(null)
    }
  }, [])

  return (
    <div className={styles.errorContainer}>
      <Image src={logo} alt={'logo'} />
      {duplicateLoginError && (
        <PageTitle title="Error" subTitle="중복된 로그인을 할 수 없습니다." />
      )}
      {apiError === 401 && !duplicateLoginError && (
        <>
          <PageTitle title="Error" subTitle="세션이 만료되었습니다" />
          <Link href="/login"> - 로그인 페이지 이동 - </Link>
        </>
      )}
    </div>
  )
}

export default Error
