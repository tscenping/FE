import { create } from 'zustand'

interface ModalProps {
  nickname?: string // 상대방 닉네임
  userId?: number
  avatar?: string //상대방 아바타
  gameMode?: 'Normal' | 'Special'
  modalType?: 'DM' | 'INVITE' | 'EDIT' | 'GAME'
}

interface ModalState {
  modalName?:
    | 'createChatRoom'
    | 'userProfile'
    | 'chating'
    | 'friendList'
    | 'friendUsers'
    | 'exitRoom'
    | 'response'
    | 'changeImage'
    | 'joinRoom'
    | 'joinDmRoom'
    | 'inviteFriend'
    | 'channelSetting'
    | 'inviteGame'
    | 'mfa'
    | 'duplicateLogin'
    | null
  setModalName: (
    modalName:
      | 'createChatRoom'
      | 'userProfile'
      | 'chating'
      | 'friendList'
      | 'friendUsers'
      | 'response'
      | 'exitRoom'
      | 'changeImage'
      | 'joinRoom'
      | 'joinDmRoom'
      | 'inviteFriend'
      | 'channelSetting'
      | 'inviteGame'
      | 'mfa'
      | 'duplicateLogin'
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
