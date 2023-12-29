import { create } from 'zustand'

const defaultProfileImage = process.env.NEXT_PUBLIC_API_DEFAULT_PROFILE_IMAGE

interface useErrorCheckProps {
  duplicateLoginError: boolean
  apiError?: number
  setDuplicateError: (v: boolean) => void
  setApiError: (v: number) => void
}

export const useErrorCheck = create<useErrorCheckProps>((set) => ({
  duplicateLoginError: false,
  setDuplicateError: (duplicateLoginError) => set({ duplicateLoginError }),
  setApiError: (apiError) => set({ apiError }),
}))

interface useNicknameImageProps {
  avatar: string
  myNickname: string
  userId: string
  isMfaEnabled?: boolean
  mfaQrCode?: string
  setMyNickname: (v: string) => void
  setAvatar: (v: string) => void
  setUserId: (v: string) => void
  setIsMfaEnabled: (v: boolean) => void
  setMfaQrCOde: (v: string) => void
}

export const useNickNameImage = create<useNicknameImageProps>((set) => ({
  userId: null,
  myNickname: 'nicknameDefault',
  avatar: defaultProfileImage,
  setMyNickname: (myNickname) => set({ myNickname }),
  setAvatar: (avatar) => set({ avatar }),
  setUserId: (userId) => set({ userId }),
  setIsMfaEnabled: (isMfaEnabled) => set({ isMfaEnabled }),
  setMfaQrCOde: (mfaQrCode) => set({ mfaQrCode }),
}))
