import { create } from 'zustand'

interface useNicknameImageProps {
  avatar: string
  nickName: string
  userId: string
  setNickName: (v: string) => void
  setAvatar: (v: string) => void
  setUserId: (v: string) => void
}

export const useNickNameImage = create<useNicknameImageProps>((set) => ({
  userId: null,
  nickName: 'nickname',
  avatar: 'avatar',
  setNickName: (nickName) => set({ nickName }),
  setAvatar: (avatar) => set({ avatar }),
  setUserId: (userId) => set({ userId }),
}))
