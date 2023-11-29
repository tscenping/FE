import PageTitle from '@/components/UI/PageTitle'
import ChatMainContents from '@/components/Chat/ChatMainContents'
import { instance } from '@/util/axios'
import cookie from 'cookie'
import { useGetChannels } from '@/store/chat'
import { useEffect } from 'react'
import CreatedRoomList from '@/components/Chat/ChatType/CreatedRoomList'
import CreateRoomInput from '@/components/Modal/CreateRoom/CreateRoomInput/CreateRoomInput'
import { all } from 'axios'

interface getChannelDataProps {
  channelId: number
  name: string
  channelType: string
  entered: boolean
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
  const { setTotalAll, setTotalMe, setTotalDm, setAllChannels, setDmChannels, setMeChannels } =
    useGetChannels()

  useEffect(() => {
    setTotalAll(props.totalAll)
    setTotalMe(props.totalMe)
    setTotalDm(props.totalDm)
    const allChannels = props.allChannel.map((item) => ({
      channelId: item.channelId,
      name: item.name,
      channelType: item.channelType,
      entered: false,
    }))
    setAllChannels(allChannels)
  }, [])

  return (
    <>
      <PageTitle title={'Chatting'} subTitle={'다른유저, 친구와 대화를 나눠보세요.'} />
      <ChatMainContents />
    </>
  )
}

export async function getServerSideProps(context) {
  const mycookie = cookie.parse((context.req && context.req.headers.cookie) || '')
  if (!Object.keys(mycookie).length) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  } else {
    const accessToken = mycookie.accessToken
    const refreshToken = mycookie.refreshToken

    const header = {
      'Content-Type': 'application/json',
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    }

    const responseAll = await instance({
      url: 'https://localhost:3000/channels/all/?page=1',
      method: 'get',
      headers: header,
    })
    const responseMe = await instance({
      url: 'https://localhost:3000/channels/me/?page=1',
      method: 'get',
      headers: header,
    })
    const responseDm = await instance({
      url: 'https://localhost:3000/channels/dm/?page=1',
      method: 'get',
      headers: header,
    })
    return {
      props: {
        totalAll: responseAll.data.totalDataSize,
        totalMe: responseMe.data.totalDataSize,
        totalDm: responseDm.data.totalItemCount,
        allChannel: responseAll.data.channels,
        meChannel: responseMe.data.channels,
        dmChannel: responseDm.data.dmChannels,
      },
    }
  }
}

export default ChatPage
