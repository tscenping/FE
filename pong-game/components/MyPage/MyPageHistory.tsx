import MatchHistory from '../History/MatchHistory'
import styles from './MyPageHistory.module.scss'

interface GameHistoryContents {
  rivalName: string
  rivalAvatar: string
  rivalScore: number
  myScore: number
  isWinner: boolean
}

interface GameHistoryProps {
  gameHistories: GameHistoryContents[]
  totalItemsCount: number
}


export default function MyPageHistory(props: GameHistoryProps) {
  return (
    <div className={styles.historyList}>
      {props.gameHistories.map((history, index) => (
        <MatchHistory
          key={index} // React에서 각 항목을 식별하기 위한 고유한 키가 필요합니다.
          rivalName={history.rivalName}
          rivalAvatar={history.rivalAvatar}
          rivalScore={history.rivalScore}
          myScore={history.myScore}
          isWinner={history.isWinner}
        />
      ))}
    </div>
  )
}
