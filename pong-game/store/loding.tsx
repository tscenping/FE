import { create } from 'zustand'

interface LodingProps {
  isLoding: boolean
  lodingTitle?: 'inviteGame' | 'searchGame'
  cancelHandler?: () => void
}

interface LodingState{
  lodingState: LodingProps
  setLodingState: (lodingState: LodingProps) => void
}

export const useLodingState = create<LodingState>((set) => ({
  lodingState: {
    isLoding: false,
  },
  setLodingState: (lodingState: LodingProps) => set({ lodingState })
  })) 

