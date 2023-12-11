interface ChannelLogProps {
  channelMessage: JSX.Element[]
}

function ChannelLog(props: ChannelLogProps): JSX.Element {
  return <>{props.channelMessage}</>
}

export default ChannelLog
