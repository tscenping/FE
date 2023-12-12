import Image from 'next/image'
import styles from './DmChat.module.scss'
import { instance } from '@/util/axios'
import { useJoinChannel, useJoinProtectedChannel } from '@/store/chat'

interface DmChantProps {
  channelId: number //해당 dm 고유 id
  partnerName: string //dm 챗 상대방 닉네임
  avatar: string //dm 챗 상대방 아바타
  status: string //dm 챗 상대방의 online/offline
}

function DmChat(props: DmChantProps): JSX.Element {
  const { setPasswordInputRender } = useJoinProtectedChannel()
  const { setChannelId, setChannelTitle, setChannelLogEmpty } = useJoinChannel()
  const joinDmChatHandler = async () => {
    try {
      const response = await instance({
        url: `https://localhost:3000/channels/enter/${props.channelId}`,
        method: 'get',
      })
      setChannelLogEmpty([])
      setChannelId(props.channelId)
      setPasswordInputRender('CHANNEL')
      setChannelTitle(props.partnerName)
      console.log(response.data)
    } catch (error) {
      console.log('Error : ', error)
    }
  }
  return (
    <li className={styles.dmChatListContainer} onClick={joinDmChatHandler}>
      <div className={styles.profileImage}>
        <Image src={props.avatar} alt={'Opponent Profile image'} width={60} height={60} />
      </div>
      <span className={styles.opponentNickName}>{props.partnerName}</span>
    </li>
  )
}

export default DmChat
