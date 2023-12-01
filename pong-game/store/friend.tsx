import { create } from 'zustand'

// 내 친구를 저장하는 전역변수
interface userinfoProps {
  id: number
  nickname: string
  avatar: string
  status: string
}

interface useGetFriendsProps {
  allFriends: userinfoProps[]
  totalFriendCount: number
  setTotalCount: (v: number) => void
  setAllFriends: (v: userinfoProps[]) => void
}

export const useGetFriends = create<useGetFriendsProps>((set) => ({
  allFriends: [],
  totalFriendCount: 0,
  setTotalCount: (totalFriendCount) => set({ totalFriendCount }),
  setAllFriends: (allFriends) => set({ allFriends }),
}))

// 차단목록을 저장하는 전역변수
interface useGetBlocksProps {
  allBlocks: userinfoProps[]
  totalBlockCount: number
  setTotalCount: (v: number) => void
  setAllBlocks: (v: userinfoProps[]) => void
}

export const useGetBlocks = create<useGetBlocksProps>((set) => ({
  allBlocks: [],
  totalBlockCount: 0,
  setTotalCount: (totalBlockCount) => set({ totalBlockCount }),
  setAllBlocks: (allBlocks) => set({ allBlocks }),
}))
