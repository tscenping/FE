import { create } from 'zustand'

interface LodingProps {
  isLoding: boolean
  lodingTitle?: 'inviteGame' | 'searchGame'
  gameInvitationId?: number
  gameType?: 'NORMAL_MATCHING' | 'SPECIAL_MATCHING' | 'LADDER'
}

interface LodingState {
  lodingState: LodingProps
  setLodingState: (lodingState: LodingProps) => void
}

export const useLodingState = create<LodingState>((set) => ({
  lodingState: {
    isLoding: false,
    gameInvitationId: null,
  },
  setLodingState: (lodingState: LodingProps) => set({ lodingState }),
}))
