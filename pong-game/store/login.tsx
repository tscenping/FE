import { create } from 'zustand'

const defaultProfileImage = process.env.NEXT_PUBLIC_API_DEFAULT_PROFILE_IMAGE

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
  avatar: defaultProfileImage,
  setNickName: (nickName) => set({ nickName }),
  setAvatar: (avatar) => set({ avatar }),
  setUserId: (userId) => set({ userId }),
}))
