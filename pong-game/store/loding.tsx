import { create } from 'zustand'

interface LodingProps {
  isLoding: boolean
  lodingTitle?: 'inviteGame' | 'searchGame'
  gameInvitationId?:number
  cancelHandler?: () => void
}

interface LodingState{
  lodingState: LodingProps
  setLodingState: (lodingState: LodingProps) => void
}

export const useLodingState = create<LodingState>((set) => ({
  lodingState: {
    isLoding: false,
    gameInvitationId: null,
  },
  setLodingState: (lodingState: LodingProps) => set({ lodingState })
  })) 

