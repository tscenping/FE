import PageTitle from '@/components/UI/PageTitle'
import Layout from '@/components/layout/Layout'
import ChatMainContents from '@/components/Chat/ChatMainContents'

function ChatPage() {
  return (
    <Layout>
      <div>
        {' '}
        {/* page 타이틀 섹션 */}
        <PageTitle
          title={'Chatting'}
          subTitle={'다른유저, 친구와 대화를 나눠보세요.'}
        />
      </div>
      <ChatMainContents />
    </Layout>
  )
}

export default ChatPage
