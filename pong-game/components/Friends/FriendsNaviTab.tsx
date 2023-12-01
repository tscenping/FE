import styles from './FriendsNaviTab.module.scss'
import { useFriendSetPage } from '@/store/friend'

interface FriendNaviTabProps {
  name: string
  id: string
  value: string
  tabState: string
  title: string
}

function FriendsNaviTab(props: FriendNaviTabProps): JSX.Element {
  const { setTabState } = useFriendSetPage()
  return (
    <span className={styles.tab}>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        checked={props.tabState === props.value}
        onChange={() => setTabState(props.value)}
      />
      <label
        htmlFor={props.id}
        className={props.tabState === props.value ? styles.checkList : styles.noCheckList}
      >
        {props.title}
      </label>
    </span>
  )
}

export default FriendsNaviTab
