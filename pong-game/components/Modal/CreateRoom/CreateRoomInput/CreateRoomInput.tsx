import { RefObject } from 'react'
import TitleInput from './TitleInput'
import PasswordInput from './PasswordInput'

interface CreateRoomInputProps {
  tabState: string
  titleRef: RefObject<HTMLInputElement>
  passwordRef: RefObject<HTMLInputElement>
}

function CreateRoomInput(props: CreateRoomInputProps): JSX.Element {
  return (
    <>
      <TitleInput titleRef={props.titleRef} />
      <PasswordInput passwordRef={props.passwordRef} tabState={props.tabState} />
    </>
  )
}

export default CreateRoomInput
