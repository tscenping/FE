import mainIcon from '@/public/img/layout/game.svg'
import chatIcon from '@/public/img/layout/chat.svg'
import myPageIcon from '@/public/img/layout/mypage.svg'
import rankIcon from '@/public/img/layout/rank.svg'
import friendsIcon from '@/public/img/layout/friend.svg'
import Link from 'next/link'
import Image from 'next/image'

interface sideBarContentProps {
  content: string
}

function SideBarContent({ content }: sideBarContentProps): JSX.Element {
  const icon =
    content === 'friends'
      ? friendsIcon
      : content === 'main'
      ? mainIcon
      : content === 'chat'
      ? chatIcon
      : content === 'mypage'
      ? myPageIcon
      : rankIcon

  return (
    <li>
      <Link href={`/${content}`}>
        <Image src={icon} alt={`${content}`} width={50} height={50} />
      </Link>
    </li>
  )
}

export default SideBarContent
