import Image from 'next/image'
import styles from './FriendUserListContainer.module.scss'
import cancelBlock from '@/public/img/friends/x.svg'
import toggle from '@/public/img/chat/userToggle.svg'
import React, { useState } from 'react'
import DropDown from '../DropDown/DropDown'
import { instance } from '@/util/axios'
import { useModalState, useResponseModalState } from '@/store/store'
import { useGetBlocks } from '@/store/friend'
import { useJoinChannel } from '@/store/chat'
import { useErrorCheck } from '@/store/login'

interface FriendUserListContainerprops {
  nickname: string
  avatar: string
  id: number
  status: string
  isFriend: boolean
  isBlocked: boolean
}

function FriendUserListContainer(props: FriendUserListContainerprops): JSX.Element {
  const [dropDownState, setDropDownState] = useState(false)
  const { setTotalBlockCount, totalBlockCount } = useGetBlocks()
  const { channelUserInfo, setChannelUserInfo } = useJoinChannel()
  const { setModalName } = useModalState()
  const { setResponseModalState } = useResponseModalState()
  const { setApiError } = useErrorCheck()

  const baseImg = process.env.NEXT_PUBLIC_API_DEFAULT_PRIFILE_IMAGE

  const userStyle = props.isBlocked //block유저이면 styles.block, block유저가 아니면 OFFLINE, ONLINE에 따라서 css 적용
    ? styles.block
    : props.status === 'ONLINE'
    ? styles.online
    : styles.offline

  const changeArrayItem = (newType, idToChange) => {
    const result = channelUserInfo.map((item) => {
      if (item.nickname === idToChange) {
        return {
          ...item,
          isBlocked: newType,
        }
      } else {
        return {
          ...item,
        }
      }
    })
    setChannelUserInfo(result)
  }

  const cancelBlockApi = async () => {
    try {
      await instance
        .delete(`/users/blocks`, {
          data: {
            blockId: props.id,
            // blockId: 3,
          },
          withCredentials: true,
        })
        .then(function (res) {
          console.log(res)
          setTotalBlockCount(totalBlockCount - 1)
          changeArrayItem(false, props.nickname)
        })
    } catch (e) {
      if (e.response.status === 401) setApiError(401)
      console.log(e.message)
    }
  }

  const cancelBlockHandler = async () => {
    setResponseModalState(
      '유저 차단',
      `${props.nickname}님을 차단 해제 하시겠습니까?`,
      cancelBlockApi,
    )
    setModalName('response')
  }

  return (
    <>
      <li className={styles.friendUserListContainer}>
        <div className={userStyle}>
          <Image
            src={props.avatar ? props.avatar : baseImg}
            alt={'user profile image'}
            width={80}
            height={80}
          />
          <strong>{props.nickname}</strong>
        </div>
        <div className={styles.friendUserToggle}>
          {!props.isBlocked ? (
            <Image
              src={toggle}
              alt={'user edit toggle button'}
              onClick={() => setDropDownState((prev) => !prev)}
            />
          ) : (
            <Image
              src={cancelBlock}
              alt={'edit block button'}
              width={32}
              height={32}
              onClick={cancelBlockHandler}
            />
          )}
          <div>
            {dropDownState && (
              <DropDown
                isDropDownView={dropDownState}
                setIsDropDownView={setDropDownState}
                dropDownState="userProfile"
                avatar={props.avatar}
                userProfile={{
                  id: props.id,
                  nickname: props.nickname,
                  isFriend: props.isFriend,
                  isBlocked: props.isBlocked,
                }}
              />
            )}
          </div>
        </div>
      </li>
    </>
  )
}

export default FriendUserListContainer
