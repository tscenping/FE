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



  interface MatchResultProps {
    rivalName: string
    rivalAvatar: string
    rivalScore: number // 상대 매치 점수
    myScore: number  // 나의 매치 점수 
    isWin: boolean  // 승리 여부
    myRadderScore: number | null // 나의 래더 점수
    rivalRadderScore: number | null // 상대방 래더 점수
    gameType: 'NORMAL' | 'SPECIAL' | 'RADDER' // 진행했던 게임 타입
  }
  
  interface MatchResultState{
    matchResultState: MatchResultProps
    setMatchResultState: (resultState: MatchResultProps) => void
  }
  
  export const useMatchResultState = create<MatchResultState>((set) => ({
    matchResultState: {
      rivalName: '',
      rivalAvatar: '',
      rivalScore: 0,
      myScore: 0,
      isWin: false,
      myRadderScore: null,
      rivalRadderScore: null,
      gameType: 'NORMAL'
    },
    setMatchResultState: (matchResultState: MatchResultProps) => set({ matchResultState })
    }))