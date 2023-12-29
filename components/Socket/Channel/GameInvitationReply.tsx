import { socket } from '@/socket/socket'
import { useMatchGameState } from '@/store/game'
import { useLodingState } from '@/store/loding'
import { useModalState, useResponseModalState } from '@/store/store'
import { useRouter, NextRouter } from 'next/router'
import { useEffect } from 'react'

interface gameInvitationReplyData {
  isAccepted: boolean
  gameId: number
}

export default function GameInvitationReply() {
  const router: NextRouter = useRouter()
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()
  const { setLodingState } = useLodingState()
  const { matchGameState, setMatchGameState } = useMatchGameState()

  const gameInvitationReplyHandler = (data: gameInvitationReplyData) => {
    setLodingState({ isLoding: false })
    if (data.isAccepted) {
      setMatchGameState({ gameId: data.gameId })
      router.push('/match')
    } else {
      setModalName('response')
      responseModal.setResponseModalState('게임초대', '상대방이 게임 초대를 거절하였습니다.', null)
    }
    console.log(data.gameId)
  }
  useEffect(() => {
    if (router.pathname !== '/match') {
      socket.on('gameInvitationReply', gameInvitationReplyHandler)
    }

    return () => {
      socket.off('gameInvitationReply')
    }
  }, [])
  return <></>
}
