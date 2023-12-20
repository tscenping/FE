import { create } from 'zustand'

interface MatchGameProps {
  gameId: number
  // lodingTitle?: 'inviteGame' | 'searchGame'
  // cancelHandler?: () => void
}

interface MatchGameState{
  matchGameState: MatchGameProps
  setMatchGameState: (gameState: MatchGameProps) => void
}

export const useMatchGameState = create<MatchGameState>((set) => ({
  matchGameState: {
    gameId: -1,
  },
  setMatchGameState: (matchGameState: MatchGameProps) => set({ matchGameState })
  }))
