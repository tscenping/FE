import ChatPasswordInput from '@/components/Chat/Input/ChatPasswordInput'
import { channel } from 'diagnostics_channel'
import { create } from 'zustand'

interface useNavBarStateProps {
  tabState: string
  setTabState: (v: string) => void
}

interface useCreateRoomNavBarStateProps {
  tabState: string
  setTabState: (v: string) => void
}

interface sendData {
  name: string
  channelType: string
  password: string
  userId: string
}

export const useNavBarState = create<useNavBarStateProps>((set) => ({
  tabState: '1',
  setTabState: (tabState) => set({ tabState }),
}))

export const useCreateRoomNavBarState = create<useCreateRoomNavBarStateProps>((set) => ({
  tabState: 'publicOrProtected',
  setTabState: (tabState) => set({ tabState }),
}))

// "Protected" 채널에 join할때 사용하는 전역 상태 변수
interface useJoinProtectedChannelProps {
  channelId?: number
  channelTitle: string
  channelType: string
  channelAuth: string
  passwordInputRender: string
  setChannelProtectedId: (v: number) => void
  setPasswordInputRender: (v: string) => void
  setChannelTitle: (v: string) => void
  setChannelType: (v: string) => void
  setChannelAuth: (v: string) => void
}

export const useJoinProtectedChannel = create<useJoinProtectedChannelProps>((set) => ({
  passwordInputRender: 'DEFAULT',
  channelTitle: '',
  channelType: '',
  channelAuth: '',
  setChannelProtectedId: (channelId) => set({ channelId }),
  setPasswordInputRender: (passwordInputRender) => set({ passwordInputRender }),
  setChannelTitle: (channelTitle) => set({ channelTitle }),
  setChannelType: (channelType) => set({ channelType }),
  setChannelAuth: (channelAuth) => set({ channelAuth }),
}))

// 채널에 join했을 경우 전역 상태 변수
interface useChannelUserInfoProps {
  channelUserId?: number
  userid?: number
  nickname?: string
  avatar?: string
  isFriend?: boolean
  isBlocked?: boolean
  channelUserType: string
}

interface useJoinChannelProps {
  channelId?: number
  channelTitle: string
  channelType: string
  channelAuth: string
  channelUserInfo: useChannelUserInfoProps[]
  setChannelId: (v: number) => void
  setChannelTitle: (v: string) => void
  setChannelType: (v: string) => void
  setChannelAuth: (v: string) => void
  setChannelUserInfo: (v: useChannelUserInfoProps[]) => void
}

export const useJoinChannel = create<useJoinChannelProps>((set) => ({
  channelTitle: '',
  channelType: '',
  channelAuth: '',
  channelUserInfo: [],
  setChannelId: (channelId) => set({ channelId }),
  setChannelTitle: (channelTitle) => set({ channelTitle }),
  setChannelType: (channelType) => set({ channelType }),
  setChannelAuth: (channelAuth) => set({ channelAuth }),
  setChannelUserInfo: (channelUserInfo) => set({ channelUserInfo }),
}))

// api로 받아온 채널 목록 데이터를 저장, page 상태 변수
interface getChannelDataProps {
  channelId: number
  name: string
  channelType: string
  entered: boolean
  userCount: string
}

interface useGetChannelsProps {
  totalAll?: number
  totalMe?: number
  totalDm?: number
  allChannels?: getChannelDataProps[]
  meChannels?: getChannelDataProps[]
  dmChannels?: getChannelDataProps[]
  page: number
  setTotalAll: (v: number) => void
  setTotalMe: (v: number) => void
  setTotalDm: (v: number) => void
  setAllChannels: (channels: getChannelDataProps[]) => void
  setMeChannels: (channels: getChannelDataProps[]) => void
  setDmChannels: (channels: getChannelDataProps[]) => void
  setPage: (v: number) => void
}

export const useGetChannels = create<useGetChannelsProps>((set) => ({
  totalAll: undefined,
  page: 1,
  setTotalAll: (totalAll) => set({ totalAll }),
  setTotalMe: (totalMe) => set({ totalMe }),
  setTotalDm: (totalDm) => set({ totalDm }),
  setAllChannels: (channels) => set({ allChannels: channels }),
  setMeChannels: (channels) => set({ meChannels: channels }),
  setDmChannels: (channels) => set({ dmChannels: channels }),
  setPage: (page) => set({ page }),
}))
