import styles from './ChatRoomListTab.module.scss'
import { useNavBarState } from '@/store/chat'
import { instance } from '@/util/axios'
import { useGetChannels } from '@/store/chat'

interface ChatRoomListTabProps {
  name: string
  id: string
  value: string
  tabState: string
  title: string
}

function ChatRoomListTab(props: ChatRoomListTabProps): JSX.Element {
  const { setTabState } = useNavBarState()
  const { setPage } = useGetChannels()

  return (
    <span className={styles.naviBar}>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        checked={props.tabState == props.value}
        onChange={() => {
          setTabState(props.value)
          setPage(1)
        }}
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
