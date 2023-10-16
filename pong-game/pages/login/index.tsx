import Image from 'next/image'
import notice from '../../public/img/layout/notice.svg'
import img1 from '../../public/img/layout/PONG GAME.svg'
import img2 from '../../public/img/layout/selectChat.svg'
import img3 from '../../public/img/layout/selectGame.svg'
import img4 from '../../public/img/layout/selectLogout.svg'
import img5 from '../../public/img/layout/selectMypage.svg'
import img6 from '../../public/img/layout/selectRank.svg'
import img7 from '../../public/img/layout/Chat.svg'
import img8 from '../../public/img/layout/Game.svg'
import img9 from '../../public/img/layout/Logout.svg'
import img10 from '../../public/img/layout/Mypage.svg'
import img11 from '../../public/img/layout/Rank.svg'

// const inter = Inter({ subsets: ['latin']'})

export default function Home() {
  return (
    <div>
        <div><Image src={notice} alt="notice"/>notice</div>
    <div><Image src={img1} alt="PongGame"/>ponggame</div>
    <div><Image src={img2} alt="PongGame" width={100}/>selectChat</div>
    <div><Image src={img3} alt="PongGame" width={100}/>selectGame</div>
    <div><Image src={img4} alt="PongGame" width={100}/>selectLogout</div>
    <div><Image src={img5} alt="PongGame" width={100}/>selectMypage</div>
    <div><Image src={img6} alt="PongGame" width={100}/>selectRank</div>
    <div><Image src={img7} alt="PongGame" width={100}/>selectChat</div>
    <div><Image src={img8} alt="PongGame" width={100}/>selectGame</div>
    <div><Image src={img9} alt="PongGame" width={100}/>selectLogout</div>
    <div><Image src={img10} alt="PongGame" width={100}/>selectMypage</div>
    <div><Image src={img11} alt="PongGame" width={100}/>selectRank</div>
    {/* <div><Image src={img1} alt="PongGame"/>ponggame</div> */}
    {/* <div><Image src={img1} alt="PongGame"/>ponggame</div> */}
    {/* <div><Image src={img1} alt="PongGame"/>ponggame</div> */}
    </div>
  )
}
