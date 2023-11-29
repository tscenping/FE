import { useEffect, useState } from 'react'
import styles from './ChatRoomListSection.module.scss'
import CreatedRoomList from './CreatedRoomList'
import { useGetChannels } from '@/store/chat'

function ChatRoomListSection(): JSX.Element {
  const { allChannels } = useGetChannels()

  const channelsToRender = allChannels || []

  return (
    <ul className={styles.chatRoomListSection}>
      {channelsToRender.map((channel) => (
        <CreatedRoomList
          key={channel.channelId}
          title={channel.name}
          channelId={channel.channelId}
          channelType={channel.channelType}
          entered={channel.entered}
        />
      ))}
      {/* <CreatedRoomList
        title={'한글열글자한글열글자'}
        channelType={'PUBLIC'}
        channelId={1}
        entered={false}
      />
      <CreatedRoomList
        title={'abcdefghij'}
        channelType={'PROTECTED'}
        channelId={2}
        entered={false}
      />
      <CreatedRoomList title={'채팅방 3'} channelType={'PROTECTED'} channelId={3} entered={false} />
      <CreatedRoomList title={'채팅방 4'} channelType={'PUBLIC'} channelId={4} entered={false} />
      <CreatedRoomList title={'채팅방 5'} channelType={'PUBLIC'} channelId={5} entered={false} />
      <CreatedRoomList title={'채팅방 6'} channelType={'PROTECTED'} channelId={6} entered={false} />
      <CreatedRoomList title={'채팅방 7'} channelType={'PROTECTED'} channelId={7} entered={false} /> */}
    </ul>
  )
}

export default ChatRoomListSection
