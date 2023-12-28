import MatchHistory from '../History/MatchHistory'
import styles from './MyPageHistory.module.scss'

interface GameHistoryContents {
  rivalname: string
  rivalavatar: string
  rivalscore: number
  myscore: number
  iswinner: boolean
}

interface GameHistoryProps {
  gameHistories: GameHistoryContents[]
  targetNickname?: string
  totalItemsCount: number
  userAvatar?: string
}

export default function MyPageHistory(props: GameHistoryProps) {
  return (
    <div className={styles.historyList}>
      {props.gameHistories.map((history, index) => (
        <MatchHistory
          key={index} // React에서 각 항목을 식별하기 위한 고유한 키가 필요합니다.
          rivalName={history.rivalname}
          rivalAvatar={history.rivalavatar}
          rivalScore={history.rivalscore}
          userAvatar={props.userAvatar}
          targetNickname={props.targetNickname}
          myScore={history.myscore}
          isWinner={history.iswinner}
        />
      ))}
    </div>
  )
}
