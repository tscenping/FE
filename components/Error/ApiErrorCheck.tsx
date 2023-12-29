import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useErrorCheck } from '@/store/login'
import { useModalState } from '@/store/store'

function ApiErrorCheck(): JSX.Element {
  const { apiError } = useErrorCheck()
  const { setModalName } = useModalState()
  const router = useRouter()

  useEffect(() => {
    if (apiError === 401) {
      router.push('/error')
      setModalName(null)
    }
  }, [apiError])

  return <></>
}

export default ApiErrorCheck
