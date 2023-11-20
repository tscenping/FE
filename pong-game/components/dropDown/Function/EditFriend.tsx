interface EditFriendProps {
  isFriend: boolean
}
export default function EditFriend(props: EditFriendProps) {
  return (<>
  {props.isFriend ? <button>친구삭제</button> : <button>친구추가</button>}
  </>)
}