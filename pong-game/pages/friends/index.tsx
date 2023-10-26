import PageTitle from '@/components/UI/PageTitle'
import styles from '@/styles/friends/Friends.module.scss'
import { useState } from 'react'

export default function Friends() {
  const [viewState, setViewState] = useState<'friends' | 'block' | 'search'>(
    'friends',
  )
  return (
    <div className={styles.backGround}>
      <PageTitle title="Friends" subTitle="나의 친구 목록을 볼 수 있어요" />
      <div className={styles.inputRadio}>
        <input
          type="radio"
          value={'friends'} // friends
          name={'friendsGroup'} //"gameModeGroup"
          id={'friends'} //"special"
          checked={viewState == 'friends'}
          onChange={() => setViewState('friends')}
          className={styles.radioBox}
        />
        <label htmlFor={'friends'}>
          <span className={viewState == 'friends' ? styles.selectState : styles.normalState}>친구목록</span>
        </label>
        <input
          type="radio"
          value={'block'} // friends
          name={'friendsGroup'} //"gameModeGroup"
          id={'block'} //"special"
          checked={viewState == 'block'}
          onChange={() => setViewState('block')}
          className={styles.radioBox}
        />
        <label htmlFor={'block'}>
          <span className={viewState == 'block' ? styles.selectState : styles.normalState}>차단목록</span>
        </label>
        <input
          type="radio"
          value={'search'} // friends
          name={'friendsGroup'} //"gameModeGroup"
          id={'search'} //"special"
          checked={viewState == 'search'}
          onChange={() => setViewState('search')}
          className={styles.radioBox}
        />
        <label htmlFor={'search'}>
          <span className={viewState == 'search' ? styles.selectState : styles.normalState}>유저검색</span>
        </label>
      </div>
    </div>
  )
}
