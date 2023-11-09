import { useState, useRef } from 'react'
import Image from 'next/image'
import styles from './InputNickImage.module.scss'
import defaultProfileImage from '../../public/img/login/noProfileImage.svg'

// interface InputNickImageProps {
//   state: boolean
// }

function InputNickImage(): JSX.Element {
  const [nickName, setNickName] = useState<string>('')
  const [uploadImage, setUploadImage] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const nickNameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value)
  }

  const imageHandler = (e: React.ChangeEvent) => {
    const targetFile = (e.target as HTMLInputElement).files as FileList
    const targetFilesArray = Array.from(targetFile)
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    setUploadImage(selectedFiles)
  }
  return (
    <div className={styles.inputNickImageContainer}>
      <section className={styles.title}>
        <h1>만나서 반가와요!</h1>
        <h1>어떻게 불러드리면 될까요?</h1>
      </section>
      <section className={styles.profileImage}>
        {!uploadImage.length && (
          <div className={styles.profileImageShow}>
            <Image
              src={defaultProfileImage}
              alt={'default profile image'}
              width={100}
              height={100}
            />
          </div>
        )}
        {uploadImage.map((url, i) => (
          <div key={url} className={styles.profileImageShow}>
            <Image src={url} alt={'selectedImage'} width={100} height={100} />
          </div>
        ))}
        <label htmlFor="profileImage" className={styles.inputImageButton}>
          사진선택
        </label>
        <input
          type="file"
          id="profileImage"
          className={styles.inputImage}
          accept="image/*"
          ref={fileRef}
          onChange={imageHandler}
        />
        <p className={styles.imageExplanation}>사진은 1장, 최대 15MB만 가능합니다.</p>
      </section>
      <section className={styles.profileNickName}>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          className={styles.nickNameInput}
          maxLength={10}
          onChange={nickNameInputHandler}
        />
        <div className={styles.nickNameCharCount}>
          <span>{nickName.length}</span>
          <span>/ 10</span>
        </div>
      </section>
      <section className={styles.submitButton}>
        <button className={styles.button}>완 료</button>
      </section>
    </div>
  )
}

export default InputNickImage
