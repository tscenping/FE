interface EditBlockProps {
  isBlocked: boolean
}
export default function EditBlock(props: EditBlockProps){
  
  return (<>
  {props.isBlocked ? <button>차단해제</button> : <button>차단하기</button>}
  </>)
}