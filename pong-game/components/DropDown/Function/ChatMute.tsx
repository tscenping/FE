import { instance } from '@/util/axios'

interface ChatMuteProps {
  channelUserId: number
}

export default function ChatMute(props: ChatMuteProps) {
  const chatUserMuteHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    try {
      await instance
        .patch(`/channels/mute`, {
          channelUserId: props.channelUserId,
        })
        .then(function (res) {
          console.log(res)
        })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <li>
      <button onClick={chatUserMuteHandler}>채팅금지</button>
    </li>
  )
}
