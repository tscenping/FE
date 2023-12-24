import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Error() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/main')
  }, [router])
  return <></>
}
