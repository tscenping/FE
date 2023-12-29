import { socket } from '@/socket/socket'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useErrorCheck } from '@/store/login'

export default function ErrorMeassage() {
  const router = useRouter()
  const { setDuplicateError } = useErrorCheck()

  useEffect(() => {
    socket.on('error', (error: any) => {
      setDuplicateError(true)
      console.log('active')
      router.push('/error')
      socket.disconnect()
    })

    return () => {
      socket.off('error')
    }
  }, [])

  return <></>
}
