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

interface useCreateRoomData {
  data: sendData
  setData: (v: string) => void
}

export const useNavBarState = create<useNavBarStateProps>((set) => ({
  tabState: '1',
  setTabState: (tabState) => set({ tabState }),
}))

export const useCreateRoomNavBarState = create<useCreateRoomNavBarStateProps>((set) => ({
  tabState: 'publicOrProtected',
  setTabState: (tabState) => set({ tabState }),
}))

// export const useCreateRoomData = create<useCreateRoomData>((set) => ({
//   data: { name: '', channelType: '', password: '', userId: '' },
// }))
