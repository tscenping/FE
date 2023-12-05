import { instance } from '@/util/axios'

interface ChatMuteProps {
  channelUserId: number
}

export default function ChatMute(props: ChatMuteProps) {
  const chatUserMuteHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    await instance
      .patch(`/channels/mute`, {
        channelUserId: props.channelUserId
      })
      .then(function (res) {
        console.log(res)
      })
  }

  return (
    <li>
      <button onClick={chatUserMuteHandler}>채팅금지</button>
    </li>
  )
}
