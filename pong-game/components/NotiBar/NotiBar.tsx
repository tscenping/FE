import styles from './NotiBar.module.scss'
import noticeIcon from '@/public/img/notiBar/notiBell.svg'
import chatIcon from '@/public/img/layout/chat.svg'
import gameIcon from '@/public/img/layout/game.svg'
import denyIcon from '@/public/img/notiBar/notiDeny.svg'
import agreeIcon from '@/public/img/notiBar/notiAgree.svg'
import Image from 'next/image'

export default function NotiBar() {
  return (
    <div className={styles.notiBarLayout}>
      <div className={styles.title}>
        <div>
          <Image src={noticeIcon} alt={'notice'} width={40} />
        </div>
        <div>알림</div>
      </div>
      <section>
        <section className={styles.notiContent}>
          <section className={styles.contentTitle}>
            <div className={styles.titleText}>
              <Image src={chatIcon} alt={'friend'} width={30} />
              채팅초대
            </div>
            <div>4시간 전</div>
          </section>
          <section className={styles.msg}>
            <div className={styles.contentMsg}>김철수님이 채팅에 초대하였습니다.</div>
            <div className={styles.answer}>
              <Image src={agreeIcon} alt={'friend'} width={30} className={styles.img} />
              <Image src={denyIcon} alt={'friend'} width={30} className={styles.img} />
            </div>
          </section>
        </section>
      </section>

      <div className={styles.divideLine}></div>
      <section>
        <section className={styles.notiContent}>
          <section className={styles.contentTitle}>
            <div className={styles.titleText}>
              <Image src={gameIcon} alt={'friend'} width={30} />
              게임초대
            </div>
            <div>4시간 전</div>
          </section>
          <section className={styles.msg}>
            <div className={styles.contentMsg}>김철수님이 게임에 초대하였습니다.</div>
            <div className={styles.answer}>
              <Image src={agreeIcon} alt={'friend'} width={30} className={styles.img} />
              <Image src={denyIcon} alt={'friend'} width={30} className={styles.img} />
            </div>
          </section>
        </section>
      </section>
    </div>
  )
}
