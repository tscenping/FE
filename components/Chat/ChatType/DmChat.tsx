import Image from 'next/image'
import styles from './DmChat.module.scss'
import { instance } from '@/util/axios'
import { useJoinChannel, useJoinProtectedChannel } from '@/store/chat'
import { useErrorCheck } from '@/store/login'

interface DmChantProps {
  channelId: number //해당 dm 고유 id
  partnerName: string //dm 챗 상대방 닉네임
  avatar: string //dm 챗 상대방 아바타
  status: string //dm 챗 상대방의 online/offline
}

function DmChat(props: DmChantProps): JSX.Element {
  const { setPasswordInputRender } = useJoinProtectedChannel()
  const {
    setChannelId,
    setChannelTitle,
    setChannelLogEmpty,
    setChannelUserInfo,
    setChannelType,
    channelId,
  } = useJoinChannel()
  const { setApiError } = useErrorCheck()
  const userStatus =
    props.status === 'ONLINE' ? styles.profileImageOnline : styles.profileImageOffline

  const joinDmChatHandler = async () => {
    try {
      if (channelId !== props.channelId) {
        const response = await instance(`/channels/enter/${props.channelId}`, {
          method: 'get',
        })
        console.log(response)
        setChannelLogEmpty([])
        setChannelId(props.channelId)
        setPasswordInputRender('CHANNEL')
        setChannelType('DM')
        setChannelTitle(props.partnerName)
        setChannelUserInfo(response.data.channelUsers)
      }
    } catch (error) {
      if (error && error.response.status === 401) setApiError(401)
      console.log('Error : ', error)
    }
  }
  return (
    <li className={styles.dmChatListContainer} onClick={joinDmChatHandler}>
      <div className={userStatus}>
        <Image src={props.avatar} alt={'Opponent Profile image'} width={60} height={60} />
      </div>
      <span className={styles.opponentNickName}>{props.partnerName}</span>
    </li>
  )
}

export default DmChat
