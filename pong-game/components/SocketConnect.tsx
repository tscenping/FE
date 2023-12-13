import GameSocketHandler from './Socket/GameSocketHandler'
import ChannelSocketHandler from './Socket/ChannelSocketHandler'

function SocketConnect() {
  return (
    <>
      <ChannelSocketHandler />
      <GameSocketHandler />
    </>
  )
}

export default SocketConnect
