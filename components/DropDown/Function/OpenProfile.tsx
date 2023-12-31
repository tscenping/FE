import { useModalState } from '@/store/store'

interface ChatDropDownOwnerProps {
  nickname: string
  userAvatar: string
  setIsDropDownView: (v: boolean) => void
}

export default function OpenProfile(props: ChatDropDownOwnerProps) {
  const { setModalName } = useModalState()
  const { setModalProps } = useModalState()
  function setModalPropsValue(nickname: string) {
    props.setIsDropDownView(false)
    setModalProps({ nickname: nickname, avatar: props.userAvatar })
    setModalName('userProfile')
  }
  return (
    <li>
      <button
        onClick={() => {
          setModalPropsValue(props.nickname)
        }}
      >
        프로필보기
      </button>
    </li>
  )
}
