import { instance } from '@/util/axios'

export default function ChatMute() {
  const chatUserMuteHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    await instance
      .patch(`/mute`, {
        userId: 1,
        channelId: 123,
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
