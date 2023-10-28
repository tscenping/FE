import styles from './ChatRoomListTab.module.scss'

interface ChatRoomListTabProps {
  name: string
  id: string
  value: string
  tabState: string
  setTabState: (v: string) => void
  title: string
}

function ChatRoomListTab(props: ChatRoomListTabProps): JSX.Element {
  return (
    <span className={styles.naviBar}>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        checked={props.tabState == props.value}
        onChange={() => props.setTabState(props.value)}
      />
      <label
        htmlFor={props.id}
        className={
          props.tabState === props.value ? styles.checkTab : styles.noCheckTab
        }
      >
        {props.title}
      </label>
    </span>
  )
}

export default ChatRoomListTab
