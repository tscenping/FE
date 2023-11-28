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
