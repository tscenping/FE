import { useRef } from 'react'
import styles from './ChannelSetting.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import { useSettingRoomNavBarState, useJoinChannel } from '@/store/chat'
import PasswordInput from './PasswordInput'
import { instance } from '@/util/axios'
import { useModalState, useResponseModalState } from '@/store/store'

function ChannelSetting(): JSX.Element {
  const { settingTabState, setSettingTabState } = useSettingRoomNavBarState()
  const { channelId } = useJoinChannel()
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()
  const passwordRef = useRef<HTMLInputElement>()

  const passwordSubmitHandler = async (e) => {
    e.preventDefault()
    const datas = {
      channelId: channelId,
      password: settingTabState === 'PUBLIC' ? null : passwordRef.current.value,
    }
    try {
      const response = await instance({
        url: 'https://localhost:3000/channels/password',
        method: 'patch',
        data: JSON.stringify(datas),
      })
      if (response.statusText === 'OK') {
        responseModal.setResponseModalState('Channel Setting', '채널 변경에 성공하였습니다.', null)
        setModalName('response')
      }
    } catch (error) {
      console.log('Error : ', error)
    }
  }
  return (
    <div className={styles.channelSettingContainer}>
      <ModalPageTitle
        title={'Channel Setting'}
        subTitle={'현재 채널의 타입과 비밀번호를 변경해보세요'}
      />
      <nav className={styles.chatType}>
        <ul className={styles.chatTypeUnorderList}>
          <li className={settingTabState === 'PUBLIC' ? styles.selected : styles.noSelected}>
            <input
              type="radio"
              id="PUBLIC"
              onClick={() => {
                passwordRef.current.value = ''
                setSettingTabState('PUBLIC')
              }}
            />
            <label htmlFor="PUBLIC">Public</label>
          </li>
          <li className={settingTabState === 'PROTECTED' ? styles.selected : styles.noSelected}>
            <input
              type="radio"
              id="PROTECTED"
              onClick={() => {
                passwordRef.current.value = ''
                setSettingTabState('PROTECTED')
              }}
            />
            <label htmlFor="PROTECTED">Protected</label>
          </li>
        </ul>
      </nav>
      <form onSubmit={passwordSubmitHandler} className={styles.form}>
        <PasswordInput passwordRef={passwordRef} />
        <button>변 경</button>
      </form>
    </div>
  )
}

export default ChannelSetting
