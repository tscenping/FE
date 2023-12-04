import { create } from 'zustand'

interface ModalProps {
  nickname?: string
  avatar?: string
}

interface ModalState {
  modalName?:
    | 'createChatRoom'
    | 'userProfile'
    | 'chating'
    | 'friendList'
    | 'createDmRoom'
    | 'exitRoom'
    | 'response'
    | 'changeImage'
    | 'joinRoom'
    | 'joinDmRoom'
    | null
  setModalName: (
    modalName:
      | 'createChatRoom'
      | 'userProfile'
      | 'chating'
      | 'friendList'
      | 'createDmRoom'
      | 'response'
      | 'exitRoom'
      | 'changeImage'
      | 'joinRoom'
      | 'joinDmRoom'
      | null,
  ) => void
  modalProps?: ModalProps | null
  setModalProps: (modalProps: ModalProps | null) => void
}

interface UserProfileModalState {
  isFriend: boolean
  isBlock: boolean
  setProfileModalState: (isFriend: boolean, isBlock: boolean) => void
}

export const useModalState = create<ModalState>((set) => ({
  modalName: null,
  modalProps: null,
  setModalName: (modalName) => set({ modalName }),
  setModalProps: (modalProps) => set({ modalProps }),
}))

export const useUserProfileModalState = create<UserProfileModalState>((set) => ({
  isFriend: false,
  isBlock: false,
  setProfileModalState: (isFriend: boolean, isBlock: boolean) => set({ isFriend, isBlock }),
}))

interface ResponseModalState {
  title: string
  content: string
  image?: string
  onConfirm: () => void
  setResponseModalState: (
    title: string,
    content: string,
    onConfirm: () => Promise<void>,
    image?: string,
  ) => void
}

export const useResponseModalState = create<ResponseModalState>((set) => ({
  title: '',
  content: '',
  image: null,
  onConfirm: () => {},
  setResponseModalState: (title: string, content: string, onConfirm: () => void, image?: string) =>
    set({ title, content, onConfirm }),
}))
