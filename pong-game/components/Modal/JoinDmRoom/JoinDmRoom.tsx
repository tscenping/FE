import { useRouter } from 'next/router'
import styles from './JoinDmRoom.module.scss'
import Image from 'next/image'
import { useModalState } from '@/store/store'
import {
  useJoinProtectedChannel,
  useJoinChannel,
  useGetChannels,
  useReadyToChannel,
} from '@/store/chat'
import { instance } from '@/util/axios'

function JoinDmRoom(): JSX.Element {
  const { title, readyChannelId, dmAvatar } = useReadyToChannel()
  const { setModalName, modalProps } = useModalState()
  const { setPasswordInputRender } = useJoinProtectedChannel()
  const { setChannelId, setChannelLogEmpty, setChannelTitle, setChannelUserInfo, setChannelType } =
    useJoinChannel()
  const { setDmChannels, setTotalDm } = useGetChannels()
  const router = useRouter()

  const joinDmHandler = async () => {
    const datas = { name: null, channelType: 'DM', password: null, userId: readyChannelId }
    try {
      const responseCreate = await instance({
        url: 'https://localhost:3000/channels',
        method: 'post',
        data: JSON.stringify(datas),
      })
      if (responseCreate.statusText === 'Created') {
        setChannelTitle(title)
        setPasswordInputRender('CHANNEL')
        setChannelLogEmpty([])
        setChannelType('DM')
        setChannelId(responseCreate.data.channelId)
        setChannelUserInfo(null)
        if (modalProps.modalType === 'DM') {
          router.replace('/chat')
        }
        const responseDm = await instance({
          url: 'https://localhost:3000/channels/dm/?page=1',
          method: 'get',
        })
        if (responseDm.statusText === 'OK') {
          setDmChannels(responseDm.data.dmChannels)
          setTotalDm(responseDm.data.totalItemCount)
        }
      }
      setModalName(null)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const modalOffHandler = () => {
    if (modalProps.modalType === 'DM') setModalName(null)
    else setModalName('friendUsers')
  }

  return (
    <div className={styles.joinDmRoomContainer}>
      <Image src={dmAvatar} alt="opponent avatar" width={80} height={80} />
      <strong>{title}</strong>
      <p>1:1 채널을 만드시겠습니까?</p>
      <div className={styles.joinDmRoomBtn}>
        <button onClick={joinDmHandler}>생 성</button>
        <button onClick={modalOffHandler}>취 소</button>
      </div>
    </div>
  )
}

export default JoinDmRoom
