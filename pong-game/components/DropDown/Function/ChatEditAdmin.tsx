interface ChatEditAdminProps {
  channelUserType: 'OWNER' | 'ADMIN' | 'COMMON'

}

export default function ChatEditAdmin(props: ChatEditAdminProps) {
  return (<li>
  {props.channelUserType == 'ADMIN' ? <button>관리자 해제</button> : <button>관리자 임명</button>}
  </li>)
}