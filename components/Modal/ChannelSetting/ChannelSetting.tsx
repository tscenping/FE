import { useRef, useState } from 'react'
import styles from './ChannelSetting.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import { useSettingRoomNavBarState, useJoinChannel } from '@/store/chat'
import PasswordInput from './PasswordInput'
import { instance } from '@/util/axios'
import { useModalState, useResponseModalState } from '@/store/store'
import { useErrorCheck } from '@/store/login'

function ChannelSetting(): JSX.Element {
  const [error, setError] = useState('')
  const { settingTabState, setSettingTabState } = useSettingRoomNavBarState()
  const { channelId } = useJoinChannel()
  const { setModalName } = useModalState()
  const responseModal = useResponseModalState()
  const passwordRef = useRef<HTMLInputElement>()
  const { setApiError } = useErrorCheck()
  const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g

  const passwordSubmitHandler = async (e) => {
    e.preventDefault()
    const datas = {
      channelId: channelId,
      password: settingTabState === 'PUBLIC' ? null : passwordRef.current.value,
    }
    if (
      settingTabState !== 'PUBLIC' &&
      (passwordRef.current.value.length < 8 ||
        !passwordRef.current.value ||
        koreanRegex.test(passwordRef.current.value))
    ) {
      //password값이 8자 이하일 경우 set state "lessPassword"로 지정
      setError('passwordError')
      passwordRef.current.value = '' //그리고 해당 비밀번호 입력 값을 비워준다.
      return
    }

    try {
      const response = await instance('/channels/password', {
        method: 'patch',
        data: JSON.stringify(datas),
      })
      if (response.statusText === 'OK') {
        responseModal.setResponseModalState('Channel Setting', '채널 변경에 성공하였습니다.', null)
        setModalName('response')
      }
    } catch (error) {
      if (error && error.response.status === 401) setApiError(401)
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
                setError('')
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
        {error === 'passwordError' && (
          <p className={styles.error}>
            채널의 비밀번호는 8 ~ 16자의 영문, 숫자, 특수문자를 사용해주세요.
          </p>
        )}
        <button>변 경</button>
      </form>
    </div>
  )
}

export default ChannelSetting
