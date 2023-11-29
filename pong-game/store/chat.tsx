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

interface useJoinProtectedChannelProps {
  channelId?: number
  channelTitle: string
  passwordInputRender: string
  setChannelId: (v: number) => void
  setPasswordInputRender: (v: string) => void
  setChannelTitle: (v: string) => void
}

export const useJoinProtectedChannel = create<useJoinProtectedChannelProps>((set) => ({
  passwordInputRender: 'DEFAULT',
  channelTitle: '',
  setChannelId: (channelId) => set({ channelId }),
  setPasswordInputRender: (passwordInputRender) => set({ passwordInputRender }),
  setChannelTitle: (channelTitle) => set({ channelTitle }),
}))

interface getChannelDataProps {
  channelId: number
  name: string
  channelType: string
  entered: boolean
}

interface useGetChannelsProps {
  totalAll?: number
  totalMe?: number
  totalDm?: number
  allChannels?: getChannelDataProps[]
  meChannels?: getChannelDataProps[]
  dmChannels?: getChannelDataProps[]
  // showAllChannels?: getChannelDataProps2[]
  // showMeChannels?: getChannelDataProps2[]
  // showDmChannels?: getChannelDataProps2[]

  setTotalAll: (v: number) => void
  setTotalMe: (v: number) => void
  setTotalDm: (v: number) => void
  setAllChannels: (channels: getChannelDataProps[]) => void
  setMeChannels: (channels: getChannelDataProps[]) => void
  setDmChannels: (channels: getChannelDataProps[]) => void
  // setShowAllChannels: (channels: getChannelDataProps2[]) => void
  // setShowMeChannels: (channels: getChannelDataProps2[]) => void
  // setShowDmChannels: (channels: getChannelDataProps2[]) => void
}

export const useGetChannels = create<useGetChannelsProps>((set) => ({
  totalAll: undefined,
  setTotalAll: (totalAll) => set({ totalAll }),
  setTotalMe: (totalMe) => set({ totalMe }),
  setTotalDm: (totalDm) => set({ totalDm }),
  setAllChannels: (channels) => set({ allChannels: channels }),
  setMeChannels: (channels) => set({ meChannels: channels }),
  setDmChannels: (channels) => set({ dmChannels: channels }),
  // setShowAllChannels: (channels) => set({ showAllChannels: channels }),
  // setShowMeChannels: (channels) => set({ showMeChannels: channels }),
  // setShowDmChannels: (channels) => set({ showDmChannels: channels }),
}))
