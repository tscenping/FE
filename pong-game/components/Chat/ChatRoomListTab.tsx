import styles from './ChatRoomListTab.module.scss'
import { useNavBarState } from '@/store/chat'
import { instance } from '@/util/axios'

interface ChatRoomListTabProps {
  name: string
  id: string
  value: string
  tabState: string
  title: string
}

function ChatRoomListTab(props: ChatRoomListTabProps): JSX.Element {
  const { setTabState } = useNavBarState()

  return (
    <span className={styles.naviBar}>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        checked={props.tabState == props.value}
        onChange={() => setTabState(props.value)}
      />
      <label
        htmlFor={props.id}
        className={props.tabState === props.value ? styles.checkTab : styles.noCheckTab}
      >
        {props.title}
      </label>
    </span>
  )
}

export default ChatRoomListTab
