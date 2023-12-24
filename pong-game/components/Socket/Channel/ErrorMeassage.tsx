import { socket } from '@/socket/socket'

export default function ErrorMeassage() {
  socket.on('error', (error: any) => {
    console.log(error)
    alert(error.message)
  })
  return <></>
}
