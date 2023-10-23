interface DropDownChatingProps {
  isFriend: boolean
  isBlock: boolean
  isOwner: boolean
  isAdmin: boolean
  isMeAdmin: boolean
  isMeOwner: boolean
}

export default function DropDownChating({
  isFriend,
  isBlock,
  isAdmin,
  isOwner,
  isMeAdmin,
  isMeOwner,
}: DropDownChatingProps) {
  return (
    <div>
      {isMeOwner ? 
      <> {isAdmin ? <button>관리자 해제</button> : <button>관리자 임명</button>}
      </> :
      <>
      </>}
      {isMeAdmin ? 
      <>
      </> : 
      <>
      </>}
      {/* {isMeAdmin || isMeOwner ? (
        <>{isOwner || isAdmin ? null : <button>강퇴하기</button>}</>
      ) : null}
      {isMeAdmin || isMeOwner ? (
        <>{isOwner || isAdmin ? null : <button>채팅금지</button>}</>
      ) : null}
      {isMeOwner ? (
        <>
          {isAdmin ? (
            <button>관리자 해제</button>
          ) : (
            <button>관리자 임명</button>
          )}
        </>
      ) : null} */}
      {isFriend ? <button>친구삭제</button> : <button>친구추가</button>}
      {isBlock ? <button>차단해제</button> : <button>차단하기</button>}
      <button>프로필보기</button>
      <button>게임하기</button>
      <button>1:1메세지</button>
    </div>
  )
}
