import { RefObject } from 'react'
import styles from './MessageInput.module.scss'

interface MessageInputProps {
  messageRef: RefObject<HTMLInputElement>
}

function MessageInput(props: MessageInputProps): JSX.Element {
  return (
    <>
      <input type="text" className={styles.messageInput} ref={props.messageRef} required />
      <span className={styles.folderNameInputPlaceHolder}>Message Input</span>
    </>
  )
}

export default MessageInput
