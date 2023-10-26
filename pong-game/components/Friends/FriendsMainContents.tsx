import { useState } from 'react'
import styles from '@/styles/components/Friends/FriendsMainContents.module.css'
import FriendsNaviTab from './FriendsNaviTab'
import Image from 'next/image'
import profileImage from '@/public/img/chat/userProfileImage.svg'
import toggle from '@/public/img/chat/userToggle.svg'
import cancelBlock from '@/public/img/friends/x.svg'
import searchButton from '@/public/img/chat/enterInput.svg'

function FriendsMainContents(): JSX.Element {
  const [tabState, setTabState] = useState('1')
  return (
    <div className={styles.friendPageComponent}>
      <div className={styles.friendTypeNaviContainer}>
        <FriendsNaviTab
          name={'friendUsers'}
          id={'frinedUsers'}
          value="1"
          tabState={tabState}
          setTabState={setTabState}
          title="친구목록"
        />
        <FriendsNaviTab
          name={'blockUsers'}
          id={'blockUsers'}
          value="2"
          tabState={tabState}
          setTabState={setTabState}
          title="차단목록"
        />
        <FriendsNaviTab
          name={'searchUsers'}
          id={'searchUsers'}
          value="3"
          tabState={tabState}
          setTabState={setTabState}
          title="유저검색"
        />
      </div>
      {/* <div className={styles.frinedUsersListContainer}> */}
      {tabState === '1' && (
        <ul className={styles.frinedUsersListContainer}>
          <li className={styles.friendUserListContainer}>
            <div className={styles.friendUserImageNickName}>
              <Image
                src={profileImage}
                alt={'user profile image'}
                width={80}
                height={80}
              />
              <strong>sangyeki</strong>
            </div>
            <div className={styles.friendUserToggle}>
              <Image src={toggle} alt={'user edit toggle button'} />
            </div>
          </li>
          <li className={styles.friendUserListContainer}>
            <div className={styles.friendUserImageNickName}>
              <Image
                src={profileImage}
                alt={'user profile image'}
                width={80}
                height={80}
              />
              <strong>sangyeki</strong>
            </div>
            <div className={styles.friendUserToggle}>
              <Image src={toggle} alt={'user edit toggle button'} />
            </div>
          </li>
          <li className={styles.friendUserListContainer}>
            <div className={styles.friendUserImageNickName}>
              <Image
                src={profileImage}
                alt={'user profile image'}
                width={80}
                height={80}
              />
              <strong>sangyeki</strong>
            </div>
            <div className={styles.friendUserToggle}>
              <Image src={toggle} alt={'user edit toggle button'} />
            </div>
          </li>
          <li className={styles.friendUserListContainer}>
            <div className={styles.friendUserImageNickName}>
              <Image
                src={profileImage}
                alt={'user profile image'}
                width={80}
                height={80}
              />
              <strong>sangyeki</strong>
            </div>
            <div className={styles.friendUserToggle}>
              <Image src={toggle} alt={'user edit toggle button'} />
            </div>
          </li>
        </ul>
      )}
      {tabState === '2' && (
        <ul className={styles.frinedUsersListContainer}>
          <li className={styles.friendUserListContainer}>
            <div className={styles.friendUserImageNickName}>
              <Image
                src={profileImage}
                alt={'user profile image'}
                width={80}
                height={80}
              />
              <strong>sangyeki</strong>
            </div>
            <div className={styles.friendUserToggle}>
              <Image src={cancelBlock} alt={'unblocking users'} />
            </div>
          </li>
          <li className={styles.friendUserListContainer}>
            <div className={styles.friendUserImageNickName}>
              <Image
                src={profileImage}
                alt={'user profile image'}
                width={80}
                height={80}
              />
              <strong>sangyeki</strong>
            </div>
            <div className={styles.friendUserToggle}>
              <Image src={cancelBlock} alt={'unblocking users'} />
            </div>
          </li>
        </ul>
      )}
      {tabState === '3' && (
        <div className={styles.searchUsers}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              className={styles.searchInput}
              required
              maxLength={10}
            />
            <span className={styles.searchInputPlaceholder}>
              닉네임을 입력하세요.
            </span>
            <button className={styles.searchUserButton}>
              <Image src={searchButton} alt={'searh user button'} />
            </button>
          </div>
          <div className={styles.findUserList}>
            <ul className={styles.frinedUsersListContainer}>
              <li className={styles.friendUserListContainer}>
                <div className={styles.friendUserImageNickName}>
                  <Image
                    src={profileImage}
                    alt={'user profile image'}
                    width={80}
                    height={80}
                  />
                  <strong>sangyeki</strong>
                </div>
                <div className={styles.friendUserToggle}>
                  <Image src={toggle} alt={'user edit toggle button'} />
                </div>
              </li>
              <li className={styles.friendUserListContainer}>
                <div className={styles.friendUserImageNickName}>
                  <Image
                    src={profileImage}
                    alt={'user profile image'}
                    width={80}
                    height={80}
                  />
                  <strong>sangyeki</strong>
                </div>
                <div className={styles.friendUserToggle}>
                  <Image src={toggle} alt={'user edit toggle button'} />
                </div>
              </li>
              <li className={styles.friendUserListContainer}>
                <div className={styles.friendUserImageNickName}>
                  <Image
                    src={profileImage}
                    alt={'user profile image'}
                    width={80}
                    height={80}
                  />
                  <strong>sangyeki</strong>
                </div>
                <div className={styles.friendUserToggle}>
                  <Image src={toggle} alt={'user edit toggle button'} />
                </div>
              </li>
              <li className={styles.friendUserListContainer}>
                <div className={styles.friendUserImageNickName}>
                  <Image
                    src={profileImage}
                    alt={'user profile image'}
                    width={80}
                    height={80}
                  />
                  <strong>sangyeki</strong>
                </div>
                <div className={styles.friendUserToggle}>
                  <Image src={toggle} alt={'user edit toggle button'} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  )
}

export default FriendsMainContents
