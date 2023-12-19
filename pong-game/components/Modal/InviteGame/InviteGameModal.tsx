import { useReadyToChannel } from '@/store/chat'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './InviteGameModal.module.scss'
import { useModalState } from '@/store/store'
import { instance } from '@/util/axios'
import CustomRadio from '@/function/Game/CustomRadio'
import { useLodingState } from '@/store/loding'

export default function InviteGameModal() {
  const { setModalName, modalProps } = useModalState()
  const { lodingState, setLodingState } = useLodingState()
  const [gameInvitationId, setGameInvitationId] = useState(null)
  const [gameMode, setGameMode] = useState<'Normal' | 'Special'>(modalProps.gameMode)
  useEffect(() => {
    console.log(modalProps.gameMode)
  }, [])

  const inviteUserHandler = async () => {
    try {
      // const datas = { channelId: channelId, invitedUserId: readyChannelId }
      console.log(modalProps.userId, gameMode)
      const response = await instance
        .post('/game/invite', {
          invitedUserId: modalProps.userId,
          gameType: gameMode === 'Normal' ? 'NORMAL_INVITE' : 'SPECIAL_INVITE',
        })
        .then((res) => {
          console.log(res)
          setGameInvitationId(res.data.gameInvitationId)
          setLodingState({
            isLoding: true,
            lodingTitle: 'inviteGame',
            cancelHandler: inviteCancelHandler,
          })
        })
      setModalName(null)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const inviteCancelHandler = async () => {
    try {
      await instance.delete(`/game/invite/${gameInvitationId}`, {}).then((res) => {})
      setModalName(null)
    } catch (error) {}
  }

  const modalOffHandler = () => {
    setModalName(null)
  }
  return (
    <div className={styles.joinDmRoomContainer}>
      <Image
        src={modalProps.avatar}
        alt="opponent avatar"
        width={80}
        height={80}
        className={styles.userImg}
      />
      <strong>{modalProps.nickname}</strong>
      <p>해당 유저를 초대하시겠습니까?</p>
      <section className={styles.inputRadio}>
        <CustomRadio
          value="Normal"
          name="gameModeGroup"
          id="Normal"
          setGameMode={setGameMode}
          gameMode={gameMode}
          width={40}
        />
        <CustomRadio
          value="Special"
          name="gameModeGroup"
          id="Special"
          setGameMode={setGameMode}
          gameMode={gameMode}
          width={40}
        />
      </section>
      <div className={styles.joinDmRoomBtn}>
        <button onClick={inviteUserHandler}>초 대</button>
        <button onClick={modalOffHandler}>취 소</button>
      </div>
    </div>
  )
}
