import { create } from 'zustand'

interface ModalProps {
  nickname?: string
}

interface ModalState {
  modalName?: 'createChatRoom' | 'userProfile' | 'chating' | 'friendList' | 'createDmRoom' | null
  setModalName: (
    modalName: 'createChatRoom' | 'userProfile' | 'chating' | 'friendList' | 'createDmRoom' | null,
  ) => void
  modalProps?: ModalProps | null
  setModalProps: (modalProps: ModalProps | null) => void
}

interface userProfileModalState {
  isFriend: boolean
  isBlock: boolean
  setUseUserProfileModalState: (isFriend: boolean, isBlock: boolean) => void
}

export const useModalState = create<ModalState>((set) => ({
  modalName: null,
  modalProps: null,
  setModalName: (modalName) => set({ modalName }),
  setModalProps: (modalProps) => set({ modalProps }),
}))

export const useUserProfileModalState = create<userProfileModalState>((set) => ({
  isFriend: false,
  isBlock: false,
  setUseUserProfileModalState: (isFriend: boolean, isBlock: boolean) => set({ isFriend, isBlock }),
}))
