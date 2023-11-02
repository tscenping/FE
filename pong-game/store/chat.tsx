import { create } from 'zustand'

interface useNavBarStateProps {
  tabState: string
  setTabState: (v: string) => void
}

export const useNavBarState = create<useNavBarStateProps>((set) => ({
  tabState: '1',
  setTabState: (tabState) => set({ tabState }),
}))
