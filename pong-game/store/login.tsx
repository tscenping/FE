import { create } from 'zustand'

interface useNicknameImageProps {
  avatar: string
  nickName: string
  setNickName: (v: string) => void
  setAvatar: (v: string) => void
}

export const useNickNameImage = create<useNicknameImageProps>((set) => ({
  nickName: '',
  avatar: '',
  setNickName: (nickName) => set({ nickName }),
  setAvatar: (avatar) => set({ avatar }),
}))
