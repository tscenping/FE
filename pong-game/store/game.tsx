import { create } from 'zustand'

interface MatchGameProps {
  gameId: number
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
