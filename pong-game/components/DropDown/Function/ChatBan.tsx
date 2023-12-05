import { instance } from "@/util/axios"
interface ChatBanProps {
  channelUserId: number
}
export default function ChatBan(props: ChatBanProps) {

  const chatUserBanHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    await instance
      .patch(`/channels/ban`, {
        channelUserId: props.channelUserId
      })
      .then(function (res) {
        console.log(res)
      })
  }
  return (
    <li>
      <button onClick={chatUserBanHandler}>벤하기</button>
    </li>
  )
}
