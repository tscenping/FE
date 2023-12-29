import { create } from 'zustand'

interface MatchGameProps {
  gameId: number
}

interface MatchGameState {
  matchGameState: MatchGameProps
  setMatchGameState: (gameState: MatchGameProps) => void
}

export const useMatchGameState = create<MatchGameState>((set) => ({
  matchGameState: {
    gameId: -1,
  },
  setMatchGameState: (matchGameState: MatchGameProps) => set({ matchGameState }),
}))

interface MatchResultProps {
  rivalName: string
  rivalAvatar: string
  rivalScore: number // 상대 매치 점수
  myScore: number // 나의 매치 점수
  isWin: boolean // 승리 여부
  myLadderScore: number | null // 나의 래더 점수
  rivalLadderScore: number | null // 상대방 래더 점수
  gameType:
    | 'LADDER'
    | 'NONE'
    | 'NORMAL_MATCHING'
    | 'SPECIAL_MATCHING'
    | 'SPECIAL_INVITE'
    | 'NORMAL_INVITE' // 진행했던 게임 타입
}

interface MatchResultState {
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
    myLadderScore: null,
    rivalLadderScore: null,
    gameType: 'SPECIAL_MATCHING',
  },
  setMatchResultState: (matchResultState: MatchResultProps) => set({ matchResultState }),
}))
