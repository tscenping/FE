import PageTitle from '@/components/UI/PageTitle'
import Layout from '@/components/layout/Layout'
import ChatMainContents from '@/components/Chat/ChatMainContents'

function ChatPage() {
  return (
    <>
      <PageTitle
        title={'Chatting'}
        subTitle={'다른유저, 친구와 대화를 나눠보세요.'}
      />
      <ChatMainContents />
    </>
  )
}

export default ChatPage
