import Image from 'next/image'
import gameBtn from '../../public/img/layout/game.svg'
import styels from '../../styles/components/sidebar.module.scss'

export default function Sidebar() {
  return (<div className={styels.sidebar}>
    <div>
    <div className={styels.btn}><Image src={gameBtn} alt="PongGame" width={40} /></div>
    </div>
    </div>)
}
