import PageTitle from '@/components/UI/PageTitle'
import Layout from '@/components/layout/Layout'
function ChatPage() {
  return (
    <Layout>
      <div>
        <PageTitle
          title={'Chatting'}
          subTitle={'다른유저, 친구와 대화를 나눠보세요.'}
        />
      </div>
      <div></div>
    </Layout>
  )
}

export default ChatPage
