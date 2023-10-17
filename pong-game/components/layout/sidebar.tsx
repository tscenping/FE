import Image from 'next/image'
import gameBtn from '../../public/img/layout/game.svg'
import chatBtn from '../../public/img/layout/chat.svg'
import myPageBtn from '../../public/img/layout/mypage.svg'
import rankBtn from '../../public/img/layout/rank.svg'
import selectGameBtn from '../../public/img/layout/selectGame.svg'
import selectChatBtn from '../../public/img/layout/selectChat.svg'
import selectMyPageBtn from '../../public/img/layout/selectMypage.svg'
import selectRankBtn from '../../public/img/layout/selectRank.svg'
import styels from '../../styles/components/sidebar.module.scss'

export default function Sidebar() {
  return (<div className={styels.sidebar}>
    <div>
    <div className={styels.btn}><Image src={gameBtn} alt="PongGame" width={30} /></div>
    <div className={styels.btn}><Image src={chatBtn} alt="PongGame" width={30} /></div>
    <div className={styels.btn}><Image src={myPageBtn} alt="PongGame" width={30} /></div>
    <div className={styels.btn}><Image src={rankBtn} alt="PongGame" width={30} /></div>
    </div>
    </div>)
}
