import { useState } from 'react'
import styles from './ChangeImage.module.scss'
import ModalPageTitle from '@/components/UI/ModalPageTitle'
import Resizer from 'react-image-file-resizer'
import Image from 'next/image'
import { useModalState } from '@/store/store'
import { instance } from '@/util/axios'
import { useNickNameImage } from '@/store/login'

const defaultProfileImage = process.env.NEXT_PUBLIC_API_DEFAULT_PRIFILE_IMAGE

const ChangeImage = (): JSX.Element => {
  const { modalProps, setModalName } = useModalState()
  const { setAvatar } = useNickNameImage()
  const [uploadImage, setUploadImage] = useState<string>(modalProps.avatar) //기본 이미지를 초기값으로 세팅
  const [imagePreview, setImagePreview] = useState<string>(modalProps.avatar)
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

  const imageChangeHandler = async () => {
    try {
      await instance('/users/me/avatar', {
        method: 'patch',
        data: JSON.stringify({ avatar: uploadImage }),
      })
      setModalName(null)
      setAvatar(uploadImage)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  const modalHandler = () => {
    setModalName(null)
  }
  return (
    <div className={styles.changeImageModalContainer}>
      <ModalPageTitle title="Profile Image" subTitle="원하는 이미지로 프로필 이미지를 바꿔보세요" />
      <section className={styles.profileImage}>
        <div className={styles.profileImageShow}>
          <Image src={imagePreview} alt={'selectedImage'} width={100} height={100} />
        </div>
        <button
          onClick={() => {
            setImagePreview(defaultProfileImage)
            setUploadImage(defaultProfileImage)
          }}
          className={styles.defaultBtn}
        >
          기본 이미지 변경
        </button>
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
      <div className={styles.changeHandler}>
        <button onClick={imageChangeHandler}>확 인</button>
        <button onClick={modalHandler}>취 소</button>
      </div>
    </div>
  )
}

export default ChangeImage
