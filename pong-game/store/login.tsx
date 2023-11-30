import { create } from 'zustand'

interface useNicknameImageProps {
  avatar: string
  myNickname: string
  userId: string
  setMyNickname: (v: string) => void
  setAvatar: (v: string) => void
  setUserId: (v: string) => void
}

export const useNickNameImage = create<useNicknameImageProps>((set) => ({
  userId: null,
  myNickname: 'nickname',
  avatar: 'avatar',
  setMyNickname: (myNickname) => set({ myNickname }),
  setAvatar: (avatar) => set({ avatar }),
  setUserId: (userId) => set({ userId }),
}))
