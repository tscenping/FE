import { useState, useRef } from 'react'
import Image from 'next/image'
import Resizer from 'react-image-file-resizer'
import styles from './InputNickImage.module.scss'
import { instance } from '@/util/axios'
import NickNameInput from './NickNameInput'
import { useRouter } from 'next/router'
import { useErrorCheck } from '@/store/login'
import { useModalState, useResponseModalState } from '@/store/store'

const defaultProfileImage = process.env.NEXT_PUBLIC_API_DEFAULT_PRIFILE_IMAGE

function InputNickImage(): JSX.Element {
  const [uploadImage, setUploadImage] = useState<string>(defaultProfileImage) //기본 이미지를 초기값으로 세팅
  const [imagePreview, setImagePreview] = useState<string>(defaultProfileImage)
  const [isValidNick, setIsValidNick] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setModalName } = useModalState()
  const { setResponseModalState } = useResponseModalState()
  const router = useRouter()
  const { setApiError } = useErrorCheck()
  const patternSpecial = /[~₩;' "!@#$%^&*()_+|<>?:{}\\//=s]/ //특수문자 입력 정규식

  /* 아바타 사진 리사이징 및 base64 변환 함수 */
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200 /* width */,
        200 /* height */,
        'SVG' /* 파일형식 */,
        100 /* quality */,
        0 /* rotation */,
        (uri) => {
          /* resize new image with url*/
          resolve(uri)
        },
        'base64' /* output Type */,
      )
    })

  /* 아바타 사진 1차 유효성 검증 함수 */
  const onImageHandler = async (e) => {
    const file = await e.target.files[0]
    const suppertedFormats = ['image/jpeg', 'image/png', 'image/svg+xml']
    console.log(e.target.files[0])
    if (!e.target.files[0]) {
      return
    }
    const objectUrl = URL.createObjectURL(e.target.files[0])
    if (!suppertedFormats.includes(file.type)) {
      alert('지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요.')
      return
    }
    try {
      const compressedFile = await resizeFile(file)
      setImagePreview(objectUrl)
      setUploadImage(String(compressedFile))
    } catch (error) {
      console.log('file resizing failed')
    }
  }

  /* 입력한 닉네임, 아바타 서버로 보내는 함수 */
  const submitNicKImage = async (e) => {
    e.preventDefault()
    if (patternSpecial.test(inputRef.current.value)) {
      setIsValidNick(true)
      inputRef.current.value = ''
    } else {
      const finalData = { nickname: inputRef.current.value, avatar: uploadImage }
      try {
        const response = await instance('/auth/signup', {
          method: 'patch',
          data: JSON.stringify(finalData),
        })
        if (response.statusText === 'OK') {
          setResponseModalState('', '42 PONG에 오신걸 환영해요!', null)
          setModalName('response')
          router.replace('/main')
        }
      } catch (error) {
        if (error && error.response.status === 401) setApiError(401)
        console.log('Error : ', error)
      }
      setIsValidNick(false)
    }
  }

  return (
    <div className={styles.inputNickImageContainer}>
      <section className={styles.title}>
        <h1>만나서 반가와요!</h1>
        <h1>어떻게 불러드리면 될까요?</h1>
      </section>
      <form onSubmit={submitNicKImage}>
        <section className={styles.profileImage}>
          {uploadImage === '' ? (
            <div className={styles.profileImageShow}>
              <Image
                src={defaultProfileImage}
                alt={'default profile image'}
                width={100}
                height={100}
              />
            </div>
          ) : (
            <div className={styles.profileImageShow}>
              {imagePreview && (
                <Image src={imagePreview} alt={'selectedImage'} width={100} height={100} />
              )}
            </div>
          )}
          <label htmlFor="profileImage" className={styles.inputImageButton}>
            사진선택
          </label>
          <input
            type="file"
            id="profileImage"
            className={styles.inputImage}
            accept="image/*"
            onChange={onImageHandler}
          />
          <p className={styles.imageExplanation}>사진은 1장, JPEG, PNG, SVG파일만 가능합니다.</p>
        </section>
        <NickNameInput inputRef={inputRef} isValidNick={isValidNick} />
        <section className={styles.submitButton}>
          <button className={styles.button} type="submit">
            완 료
          </button>
        </section>
      </form>
    </div>
  )
}

export default InputNickImage
