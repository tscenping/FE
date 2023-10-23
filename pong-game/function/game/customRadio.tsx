import React from 'react'
import specialBtn from '../../public/img/game/special.svg'
import normalBtn from '../../public/img/game/normal.svg'
import selectSpecialBtn from '../../public/img/game/selectSpecial.svg'
import selectNormalBtn from '../../public/img/game/selectNormal.svg'
import Image from 'next/image'
// import styles from '../../styles/components/game/normalGame.module.scss'
import styles from '../../styles/function/game/customRadio.module.scss'

interface radioOption{
  value: string;
  name: string;
  id: string;
  setGameMode: (value: string) => void
  gameMode: string;
  width: number;
}

export default function CustomRadio({value, name, id, setGameMode, gameMode, width}:radioOption) {
  return (
    <section className={styles.customRadio}>
      <input
        type="radio"
        value={value} // special
        name={name}//"gameModeGroup"
        id={id}//"special"
        checked={gameMode == value}
        onChange={()=>setGameMode(value)}
        className={styles.radioBox}
      />
      <label htmlFor={value}>
        {gameMode == value ? (
          <div className={styles.selectSpecialText}>
            <Image
              src={(value == 'Normal' ? selectNormalBtn : selectSpecialBtn)}
              alt={'prvBtn'}
              className={styles.radioImg}
              width={width}
              height={width}
            />
            {value}
          </div>
        ) : (
          <div className={styles.specialText}>
            <Image
              src={(value == 'Normal' ? normalBtn : specialBtn)}
              alt={'prvBtn'}
              className={styles.radioImg}
              width={width}
            />
            {value}
          </div>
        )}
      </label>
    </section>
  )
}
