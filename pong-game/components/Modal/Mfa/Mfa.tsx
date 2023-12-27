import { useState, useRef } from 'react'
import styles from './Mfa.module.scss'
import { useRouter } from 'next/router'
import { instance } from '@/util/axios'
import { useNickNameImage } from '@/store/login'
import { useModalState } from '@/store/store'
import QRCode from 'react-qr-code'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import { useErrorCheck } from '@/store/login'

function Mfa(): JSX.Element {
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']) // 여러 input에 대한 상태 배열
  const [error, setError] = useState<string>('')
  const inputRefs = [
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
  ] // 각 input에 대한 ref 배열
  const { mfaQrCode, userId } = useNickNameImage()
  const { setModalName } = useModalState()
  const router = useRouter()
  const { setApiError } = useErrorCheck()

  const handleInputChange = (index, e) => {
    const value = e.target.value
    setInputValues((prevValues) => {
      const newValues = [...prevValues]
      newValues[index] = value

      // 현재 입력 필드가 마지막 필드가 아니고 입력값이 최대 길이에 도달하면
      if (index < inputRefs.length - 1 && value.length === 1) {
        // 다음 필드로 포커스 이동
        inputRefs[index + 1].current.focus()
      }

      return newValues
    })
  }

  const mfaSubmit = async (e) => {
    e.preventDefault()
    const mfaCode = inputRefs.map((ref) => ref.current?.value).join('')
    if (mfaCode.length < 6) {
      setError('notEnoughNumber')
      return
    }
    const datas = { userId: userId, token: mfaCode }
    try {
      const response = await instance('/auth/signin/mfa', {
        method: 'patch',
        data: JSON.stringify(datas),
      })
      if (response.statusText === 'OK') {
        setModalName(null)
        router.replace('/main')
      }
    } catch (error) {
      if (error.response.data.message === 'MFA 인증에 실패했습니다.') setError('wrongNumber')
      else if (error.response.status === 401) setApiError(401)
      console.log('Error : ', error)
    }
  }
  const isValueEntered = inputValues.some((value) => value !== '')

  return (
    <section className={styles.mfaModalContainer}>
      <ModalPageTitle title="2차인증" subTitle="" />
      {mfaQrCode && (
        <section className={styles.qrCode}>
          <QRCode value={mfaQrCode} />
          <strong className={styles.newQrCodeExplanation}>
            새로운 QR Code 발급시
            <br /> 해당 QR Code로 인증을 진행해 주세요.
          </strong>
        </section>
      )}
      <span className={styles.qrCodeExplanation}>
        &quot;Google Authenticator&quot; 어플로 2차인증
        <br />
        여섯자리 숫자를 입력해주세요.
      </span>
      <form onSubmit={mfaSubmit} className={styles.mfaCodeForm}>
        <div className={styles.inputContainer}>
          {inputValues.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e)}
              ref={inputRefs[index]}
              className={isValueEntered ? styles.valueEntered : ''}
            />
          ))}
        </div>
        {error === 'wrongNumber' && <p className={styles.errorMessage}>잘못된 인증 번호 입니다.</p>}
        {error === 'notEnoughNumber' && (
          <p className={styles.errorMessage}>여섯 자리를 모두 입력해주세요.</p>
        )}
        <button>제 출</button>
      </form>
    </section>
  )
}

export default Mfa
