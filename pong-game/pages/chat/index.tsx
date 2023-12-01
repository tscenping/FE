import PageTitle from '@/components/UI/PageTitle'
import ChatMainContents from '@/components/Chat/ChatMainContents'

interface getChannelDataProps {
  channelId: number
  name: string
  channelType: string
  entered: boolean
  userCount: string
}

interface ChatPageProps {
  totalAll: number
  totalMe: number
  totalDm: number
  allChannel: getChannelDataProps[]
  meChannel: getChannelDataProps[]
  dmChannel: getChannelDataProps[]
}

function ChatPage(props: ChatPageProps) {
  return (
    <>
      <PageTitle title={'Chatting'} subTitle={'다른유저, 친구와 대화를 나눠보세요.'} />
      <ChatMainContents />
    </>
  )
}

export default ChatPage
