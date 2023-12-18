import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function error() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/main')
  }, [])
  return <></>
}
