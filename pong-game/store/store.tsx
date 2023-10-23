import { create } from 'zustand'

interface ModalState {
  modalName?: 'userProfile' | 'chating' | 'friendList' | null
  setModalName: (modalName: 'userProfile' | 'chating' | 'friendList' | null) => void
}

interface userProfileModalState {
  isFriend: boolean
  isBlock: boolean
  setUseUserProfileModalState: (isFriend: boolean, isBlock: boolean) => void
}

export const useModalState = create<ModalState>((set) => ({
  modalName: null,
  setModalName: (modalName) => set({ modalName }),
}))

export const useUserProfileModalState = create<userProfileModalState>((set) => ({
  isFriend: false,
  isBlock: false,
  setUseUserProfileModalState: (isFriend: boolean, isBlock: boolean) => set({isFriend, isBlock}),
}))
