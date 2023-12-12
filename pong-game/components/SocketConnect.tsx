import GameSocketHandler from './Socket/GameSocketHandler'
import ChannelSocketHandler from './Socket/ChannelSocketHandler'
import { socket } from '@/socket/socket'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import styles from '../components/Socket/ChannelSocketHandler.module.scss'
import { gameSocket } from '@/socket/gameSocket'

function SocketConnect() {
  

  // const notify = () =>
  // toast((t) => (
  //   <div className={styles.toastBackGround}>
  //     <section className={styles.toastMsg}>him님이 게임에 초대하였습니다.</section>
  //     <section className={styles.responseBtn}>
  //       <button onClick={() => toast.dismiss(t.id)} className={styles.acceptBtn}>
  //         수락
  //       </button>
  //       <button onClick={() => toast.dismiss(t.id)} className={styles.declineBtn}>
  //         거절
  //       </button>
  //     </section>
  //   </div>
  // ))
  // useEffect(() => {
  //   socket.connect()
  //   socket.on('connect', () => {
  //     console.log('channel connect')
  //   })
  //   socket.on('gameInvitation', (data) => {
  //     console.log(123)
  //     console.log('gameInvitation response : ',data)
  //     // notify() 
      
  //   })
  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [socket])


  

  // useEffect(() => {
  //   gameSocket.connect()

  //   gameSocket.on('connect', () => {
  //     console.log('game connect')
  //   })
  //   gameSocket.on('gameInvitation', (data) => {
  //     console.log('game',data)
  //   })
  //   return () => {
  //     gameSocket.disconnect()
  //   }
  // }, [gameSocket])
  
  return <>
  <ChannelSocketHandler/>
  <GameSocketHandler/>
  </>
}

export default SocketConnect
