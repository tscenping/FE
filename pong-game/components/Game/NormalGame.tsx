import styles from './normalGame.module.scss'
import { useState } from 'react'
import CustomRadio from '@/function/Game/CustomRadio'
import PageTitle from '../UI/PageTitle'
import { useModalState } from '@/store/store'
import { useLodingState } from '@/store/loding'
import { instance } from '@/util/axios'
import { useErrorCheck } from '@/store/login'

interface props {
  setPageState: (newPageState: number) => void // setPageState 함수
  setGameState: (newGameState: string) => void // setPageState 함수
}

export default function NormalGame({ setPageState, setGameState }: props) {
  const [gameMode, setGameMode] = useState<'Normal' | 'Special'>('Normal')
  const handlePrvBtn = () => {
    setGameState('')
    setPageState(1)
  }
  const { setModalName, setModalProps } = useModalState()
  const { setLodingState } = useLodingState()
  const { setApiError } = useErrorCheck()

  const handleInviteGame = () => {
    console.log(gameMode)
    setModalProps({ modalType: 'GAME', gameMode: gameMode })
    setModalName('friendUsers')
  }

  const handleSerchGame = async () => {
    try {
      await instance
        .post('/game/match', {
          gameType: gameMode === 'Normal' ? 'NORMAL_MATCHING' : 'SPECIAL_MATCHING',
        })
        .then((res) => {
          console.log(res)
        })
      setLodingState({
        isLoding: true,
        lodingTitle: 'searchGame',
        gameType: gameMode === 'Normal' ? 'NORMAL_MATCHING' : 'SPECIAL_MATCHING',
      })
    } catch (e) {
      if (e.response.status === 401) setApiError(401)
      console.log(e.message)
    }
  }

  return (
    <div className={styles.backGround}>
      <section className={styles.title}>
        <PageTitle
          title="Game Start"
          subTitle="친구나 다른 유저들과 점수에 관계 없이 게임을 즐겨보세요."
          prvBtn={true}
          handlePrvBtn={handlePrvBtn}
        />
      </section>
      <section className={styles.btn}>
        <section className={styles.inputRadio}>
          <CustomRadio
            value="Normal"
            name="gameModeGroup"
            id="Normal"
            setGameMode={setGameMode}
            gameMode={gameMode}
            width={40}
          />
          <CustomRadio
            value="Special"
            name="gameModeGroup"
            id="Special"
            setGameMode={setGameMode}
            gameMode={gameMode}
            width={40}
          />
        </section>
        <button className={styles.gameBtn} onClick={handleSerchGame}>
          Matching
        </button>
        <button className={styles.gameBtn} onClick={handleInviteGame}>
          Invite a Friend
        </button>
      </section>
    </div>
  )
}

// const selectGameMode = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setGameMode(e.target.value)
// }

{
  /* <input
            type="radio"
            value="Normal"
            name="gameModeGroup"
            id="Normal"
            onChange={selectGameMode}
            checked={gameMode == 'Normal'}
            className={styles.radioBox}
          />
          <label htmlFor="Normal">
            {gameMode == 'Normal' ? (
              <span className={styles.selectNormalText}>
                <Image
                  src={selectNormalBtn}
                  alt={'prvBtn'}
                  className={styles.radioImg}
                  width={40}
                />{' '}
                Normal
              </span>
            ) : (
              <span className={styles.normalText}>
                <Image
                  src={normalBtn}
                  alt={'prvBtn'}
                  className={styles.radioImg}
                  width={40}
                />{' '}
                Normal
              </span>
            )}
          </label>
          <input
            type="radio"
            value="Special"
            name="gameModeGroup"
            id="Special"
            onChange={selectGameMode}
            className={styles.radioBox}
          />
          <label htmlFor="Special">
            {gameMode == 'Special' ? (
              <span className={styles.selectSpecialText}>
                <Image
                  src={selectSpecialBtn}
                  alt={'prvBtn'}
                  className={styles.radioImg}
                  width={40}
                />
                Special
              </span>
            ) : (
              <span className={styles.specialText}>
                <Image
                  src={specialBtn}
                  alt={'prvBtn'}
                  className={styles.radioImg}
                  width={40}
                />
                Special
              </span>
            )}
          </label> */
}
