import { create } from 'zustand'
import MyMessage from '@/components/Chat/ChatInfoLog/MyMessage'
import OpponentMessage from '@/components/Chat/ChatInfoLog/OpponentMessage'

//채널 목록 조회 전역상태변수
interface useNavBarStateProps {
  tabState: 'ENTIRE' | 'JOINED' | 'DM'
  setTabState: (v: string) => void
}

export const useNavBarState = create<useNavBarStateProps>((set) => ({
  tabState: 'ENTIRE',
  setTabState: (tabState: 'ENTIRE' | 'JOINED' | 'DM') => set({ tabState }),
}))

//채널 생성 모달창 전역 상태변수
interface useCreateRoomNavBarStateProps {
  tabState: string
  setTabState: (v: string) => void
}

export const useCreateRoomNavBarState = create<useCreateRoomNavBarStateProps>((set) => ({
  tabState: 'publicOrProtected',
  setTabState: (tabState) => set({ tabState }),
}))

//채널 수정 모달창 전역상태변수
interface useSettingRoomNavBarStateProps {
  settingTabState: 'PUBLIC' | 'PROTECTED'
  setSettingTabState: (v: string) => void
}

export const useSettingRoomNavBarState = create<useSettingRoomNavBarStateProps>((set) => ({
  settingTabState: 'PUBLIC',
  setSettingTabState: (settingTabState: 'PUBLIC' | 'PROTECTED') => set({ settingTabState }),
}))

// 채널에 join했을 경우 전역 상태 변수
interface useChannelUserInfoProps {
  channelUserId?: number
  userId?: number
  nickname?: string
  avatar?: string
  isFriend?: boolean
  isBlocked?: boolean
  channelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
}

interface messageProps {
  nickname: string
  message: string
  time: string
}

interface useJoinChannelProps {
  channelId?: number
  channelTitle: string
  channelType: string
  channelAuth: string
  channelLog: messageProps[]
  myChannelUserType: 'OWNER' | 'ADMIN' | 'MEMBER'
  channelUserInfo: useChannelUserInfoProps[]
  setChannelId: (v: number) => void
  setChannelTitle: (v: string) => void
  setChannelType: (v: string) => void
  setMyChannelUserType: (v: string) => void
  setChannelAuth: (v: string) => void
  setChannelUserInfo: (v: useChannelUserInfoProps[]) => void
  setChannelLog: (channelLog: messageProps) => void
  setChannelLogEmpty: (v: messageProps[]) => void
}

export const useJoinChannel = create<useJoinChannelProps>((set) => ({
  channelTitle: '',
  channelId: null,
  channelType: '',
  myChannelUserType: 'MEMBER',
  channelAuth: '',
  channelUserInfo: [],
  channelLog: [],
  setChannelId: (channelId) => set({ channelId }),
  setChannelTitle: (channelTitle) => set({ channelTitle }),
  setMyChannelUserType: (myChannelUserType: 'OWNER' | 'ADMIN' | 'MEMBER') =>
    set({ myChannelUserType }),
  setChannelType: (channelType) => set({ channelType }),
  setChannelAuth: (channelAuth) => set({ channelAuth }),
  setChannelUserInfo: (channelUserInfo) => set({ channelUserInfo }),
  setChannelLog: (channelLog) =>
    set((state) => ({ channelLog: [...state.channelLog, channelLog] })),
  setChannelLogEmpty: (channelLog) => set({ channelLog }),
}))

// api로 받아온 채널 목록 데이터를 저장, page 상태 변수
interface getChannelDataProps {
  channelId: number
  name: string
  channelType: string
  entered: boolean
  userCount: string
  isJoined: boolean
}

interface getDmDataProps {
  channelId: number
  partnerName: string
  status: string
  avatar: string
}

interface useGetChannelsProps {
  totalAll?: number
  totalMe?: number
  totalDm?: number
  allChannels?: getChannelDataProps[]
  meChannels?: getChannelDataProps[]
  dmChannels?: getDmDataProps[]
  page: number
  setTotalAll: (v: number) => void
  setTotalMe: (v: number) => void
  setTotalDm: (v: number) => void
  setAllChannels: (channels: getChannelDataProps[]) => void
  setMeChannels: (channels: getChannelDataProps[]) => void
  setDmChannels: (channels: getDmDataProps[]) => void
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

interface useReadyToChannelProps {
  title: string
  readyChannelId?: number
  dmAvatar?: string
  setTitle: (v: string) => void
  setReadyChannelId: (v: number) => void
  setDmAvatar: (v: string) => void
}

export const useReadyToChannel = create<useReadyToChannelProps>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
  setReadyChannelId: (readyChannelId) => set({ readyChannelId }),
  setDmAvatar: (dmAvatar) => set({ dmAvatar }),
}))

// // "Protected" 채널에 join할때 사용하는 전역 상태 변수
interface useJoinProtectedChannelProps {
  channelId?: number
  passwordInputRender: string
  setChannelProtectedId: (v: number) => void
  setPasswordInputRender: (v: string) => void
}

export const useJoinProtectedChannel = create<useJoinProtectedChannelProps>((set) => ({
  passwordInputRender: 'DEFAULT',
  setChannelProtectedId: (channelId) => set({ channelId }),
  setPasswordInputRender: (passwordInputRender) => set({ passwordInputRender }),
}))
