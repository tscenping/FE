import { create } from 'zustand'

// frined page, tabState 전역변수
interface useFrinedSetProps {
  friendPage: number
  tabState: string
  setFriendPage: (v: number) => void
  setTabState: (v: string) => void
}

export const useFriendSetPage = create<useFrinedSetProps>((set) => ({
  friendPage: 1,
  tabState: 'ALL',
  setFriendPage: (friendPage) => set({ friendPage }),
  setTabState: (tabState) => set({ tabState }),
}))

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
  setTotalFriendCount: (v: number) => void
  setAllFriends: (v: userinfoProps[]) => void
}

export const useGetFriends = create<useGetFriendsProps>((set) => ({
  allFriends: [],
  totalFriendCount: 0,
  setTotalFriendCount: (totalFriendCount) => set({ totalFriendCount }),
  setAllFriends: (allFriends) => set({ allFriends }),
}))

// 차단목록을 저장하는 전역변수
interface useGetBlocksProps {
  allBlocks: userinfoProps[]
  totalBlockCount: number
  setTotalBlockCount: (v: number) => void
  setAllBlocks: (v: userinfoProps[]) => void
}

export const useGetBlocks = create<useGetBlocksProps>((set) => ({
  allBlocks: [],
  totalBlockCount: 0,
  setTotalBlockCount: (totalBlockCount) => set({ totalBlockCount }),
  setAllBlocks: (allBlocks) => set({ allBlocks }),
}))
