import PageTitle from '@/components/UI/PageTitle'
import FriendsMainContents from '@/components/Friends/FriendsMainContents'

function FriendPage() {
  return (
    <>
      <PageTitle title="Friends" subTitle="나의 친구 목록을 볼 수 있어요." />
      <FriendsMainContents />
    </>
  )
}

export default FriendPage
